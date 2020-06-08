import React from 'react';
import withUnmounted from '@ishawnwang/withunmounted';

class ComponentWithResources extends React.Component {
  abort = new AbortController();
  hasUnmounted = false;

  constructor(props) {
    super(props);

    this.interval = this.props.updateInterval ? this.props.updateInterval: null;
    this.intervalIDs = {};
    this.state = {
      allLoaded : false,
      data : {}
    }
  }

  componentDidMount() {
    this.updateResources();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.updateCondition && this.props.updateCondition(prevProps, this.props, prevState, this.state, snapshot)) {
      this.updateResources();
    }
  }

  updateResources = () => {
    this.setState({allLoaded: false, data: {}});
    for (let [name, url] of Object.entries(this.props.definition)) {
      this.fetchResource(name, url);
      if (this.interval) {
        clearTimeout(this.intervalIDs[name]);
        this.intervalIDs[name] = null;
        this.checkForUpdates(name);
      }
    }
  };

  componentWillUnmount() {
    Object.keys(this.intervalIDs).forEach(ID => clearTimeout(this.intervalIDs[ID]));
    this.abort.abort();
  }

  checkForUpdates = (name) => {
    this.intervalIDs[name] = setTimeout(() => this.checkForUpdates(name), this.interval);

    if (this.props.fetchCondition && !this.props.fetchCondition(this.props)) {
      return;
    }

    if (this.state.allLoaded) {
      // console.log(name, "fetching");
      this.fetchResource(name, this.props.definition[name]);
    }
  };

  fetchResource = (name, url) => {
    fetch(url, {signal : this.abort.signal, credentials: "include",})
      .then(response => response.json())
      .then((data) => {
        if (this.hasUnmounted) {
          return
        }

        this.setState((prevState) => {
          prevState.data[name] = data;
          if (Object.keys(prevState.data).length === Object.keys(this.props.definition).length) {
            prevState.allLoaded = true;
          }
          return prevState;
        });
      })
      .catch(e => console.log(e))
    ;
  };

  render() {
    return this.props.children(this.state.allLoaded, this.state.data);
  }

}

export default withUnmounted(ComponentWithResources);