import React from 'react';
import './plot-styles.css';
import withUnmounted from '@ishawnwang/withunmounted';
// import MapPlot from './MapPlot';
import ChemSpacePlot from "./ChemSpacePlot";

class Map extends React.Component {
  abort = new AbortController();
  hasUnmounted = false;

  constructor(props) {
    super(props);

    this.state = this.initState({});
  }

  initState = (prevState) => {
    const pointsUrl = new URL(`${this.props.map.id}/points/`, this.props.apiUrls.mapsRoot);
    return {
      points : {},
      molecules: {},
      pointsTotal: 0,
      pointsLoaded: 0,
      lastPage : null,
      nextPage : pointsUrl,
    }
  };

  componentDidMount() {
    this.fetchData(this.state.nextPage);
  }

  componentWillUnmount() {
    this.abort.abort();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.map.id !== this.props.map.id) {
      this.setState(
        prevState => this.initState(prevState)
        , () => this.fetchData(this.state.nextPage)
      )
    }
  }

  fetchData = (page) => {
    fetch(page, {signal : this.abort.signal, credentials: "include",})
      .then(response => this.props.handleResponseErrors(response, `Cannot fetch page: ${page.toString()}`))
      .then(data => {
        const pagePoints = {};
        data.results.forEach(
          result => {
            const providers = [];
            this.props.molsets.forEach(molset => {
              if (result.compoundSets.includes(molset.id)) {
                providers.push(molset);
              }
            });
            providers.forEach(provider => {
              if (!pagePoints.hasOwnProperty(provider.id)) {
                pagePoints[provider.id] = [];
              }
              pagePoints[provider.id].push(result)
            })
          }
        );

        if (this.hasUnmounted) {
          return
        }

        let nextPage = null;
        if (data.next) {
          nextPage = new URL(data.next);
          this.fetchData(new URL(data.next));
        }

        this.setState(prevState => {
          const points = prevState.points;
          Object.keys(pagePoints).forEach(providerID => {
            pagePoints[providerID].forEach(point => this.fetchMoleculeData(point.id, point.molecule));
            if (points[providerID]) {
              pagePoints[providerID].forEach(result =>
                points[providerID].push(result)
              );
            } else {
              points[providerID] = pagePoints[providerID];
            }
          });

          return {
            points : points,
            lastPage: page,
            nextPage: nextPage,
            pointsTotal: data.count,
            pointsLoaded: prevState.pointsLoaded + data.results.length
          }
        })
      })
      .catch(e => console.log(e))
  };

  fetchMoleculeData(pointID, molID) {
      const propsList = [
          "AMW",
          "NUMHEAVYATOMS",
          "NUMAROMATICRINGS",
          "HBA",
          "HBD",
          "LOGP",
          "TPSA",
      ];
      fetch(new URL(`${molID}/?properties=${propsList.join(',')}`, this.props.apiUrls.compoundsRoot), {signal : this.abort.signal, credentials: "include",})
          .then(response => response.json())
          .then(
              data => {
                  this.setState(prevState => {
                      prevState.molecules[pointID] = data;
                      prevState.molecules[pointID].activities = {};
                      return prevState;
                  }, () => {
                      this.fetchMolActivities(pointID, molID);
                  })
              }
          )
          .catch(
              (error) => console.log(error)
          );
  }

  fetchMolActivities(pointID, molID) {
      Object.keys(this.props.activitySets).forEach(actsetID => {
          const molset = this.props.molsets.find(molset => molset.activities.includes(Number(actsetID)));
          if (!molset) {
              return
          }
          fetch(new URL(`${molID}/activities/?activity_set=${actsetID}`, this.props.apiUrls.compoundsRoot), {signal : this.abort.signal, credentials: "include",})
              .then(response => response.json())
              .then(
                  data => {
                      this.setState(prevState => {
                          if (prevState.molecules[pointID].activities[actsetID]) {
                              data.forEach(activity => prevState.molecules[pointID].activities[actsetID].push(activity))
                          } else {
                              prevState.molecules[pointID].activities[actsetID] = data;
                          }
                          return prevState;
                      })
                  }
              )
              .catch(
                  (error) => console.log(error)
              );
      });
  }

  render() {
    return (
      <ChemSpacePlot
        {...this.props}
        points={this.state.points}
        pointsToMolecules={this.state.molecules}
        pointsTotal={this.state.pointsTotal}
        pointsLoaded={this.state.pointsTotal !== 0 && this.state.pointsLoaded === this.state.pointsTotal}
        moleculesLoaded={Object.keys(this.state.molecules).length === this.state.pointsTotal}
      />
    )
  }
}

export default withUnmounted(Map);