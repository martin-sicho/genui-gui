import React from 'react';
import {PLOTLY_COLORS} from "../../../../genui";
import {Progress} from "reactstrap";

class ChemSpacePlot extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                points: {},
                compounds: {},
                // paths: [],
                feature_names: [],
                categories: [],
            },
            revision: 0,
            lastIndex: {},
            pointsLoaded: false,
            mapDrawn: false,
            parsingMols: false,
            parsedMols: 0,
            molsParsed: false,
        }
    }

    componentDidMount() {
        this.setState(prevState => {
            prevState.data.categories = this.props.molsets.map((molset, idx) => ({
                points: [],
                label: molset.name,
                id: molset.id
            }));
            return prevState;
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.countPropsPoints(this.props.points) > Object.keys(this.state.data.points).length) {
            this.updatePoints();
        }
        if (!this.state.molsParsed && !this.state.parsingMols && this.props.pointsFinishedLoading && this.props.moleculesFinishedLoading) {
            this.parseMoleculeData();
        }

        if (!this.state.mapDrawn && this.state.parsingMols && (this.state.parsedMols === Object.keys(this.state.data.points).length)) {
            this.setState({
                molsParsed: true,
                parsingMols: false
            // });
            }, this.drawMap);
        }
    }

    countPropsPoints(points) {
        let count = 0;
        Object.keys(points).forEach(key => count = count + points[key].length);
        return count;
    }

    updatePoints() {
        const points = this.props.points;
        const molsets = this.props.molsets;

        this.setState(prevState => {
            molsets.forEach(molset => {
                const lastIndex = prevState.lastIndex[molset.id];
                if (points.hasOwnProperty(molset.id)) {
                    const convertedPoints = this.convertPoints(points[molset.id], lastIndex);
                    const compounds = {};
                    Object.keys(convertedPoints).forEach(key => compounds[key] = {
                        smiles: convertedPoints[key].smiles,
                    });
                    const category = prevState.data.categories.find(category => category.id === molset.id);
                    category.points = category.points.concat(Object.keys(convertedPoints));
                    category.color = this.props.molsetsToColor[molset.id];
                    prevState.data.compounds = Object.assign(prevState.data.compounds, compounds);
                    prevState.data.points = Object.assign(prevState.data.points, convertedPoints);
                    prevState.lastIndex[molset.id] = points[molset.id].length - 1;
                }
            });

            prevState.data.feature_names = [
              `${this.props.map.trainingStrategy.algorithm.name}-x`,
              `${this.props.map.trainingStrategy.algorithm.name}-y`,
            ];

            prevState.revision = prevState.revision + 1;
            return prevState;
        })
    }

    convertPoints(points, lastIndex) {
        const ret = {};
        if (lastIndex) {
            points.slice(lastIndex + 1).forEach(point => ret[point.id] = this.convertPoint(point))
        } else {
            points.forEach(point => ret[point.id] = this.convertPoint(point))
        }
        return ret;
    }

    convertPoint(point) {
        const label = `MOLECULE_${point.molecule}`;
        return {
            object_ids: [label],
            features: [point.x, point.y],
            label: label,
            smiles: point.smiles,
            molID: point.molecule,
            categories: point.compoundSets
        }
    }

    parseMoleculeData() {
        this.setState({parsingMols: true});

        // load physchem prop names
        const activity_types = [];
        this.setState(prevState =>{
            prevState.data.feature_names = prevState.data.feature_names.concat(
                Object.keys(this.props.pointsToMolecules[Object.keys(this.props.pointsToMolecules)[0]].properties).map(propName => propName)
            );

            Object.keys(this.props.pointsToMolecules).forEach((point_id, idx) => {
                const molecule = this.props.pointsToMolecules[point_id];
                Object.keys(molecule.activities).forEach(actset_id => {
                    const activities = molecule.activities[actset_id];
                    activities.forEach(activity => {
                        if (!activity_types.includes(activity.type.id)) {
                            activity_types.push(activity.type.id);
                            prevState.data.feature_names.push(activity.type.value);
                        }
                    });
                });
            });

            return prevState
        });

        Object.keys(this.props.pointsToMolecules).forEach((point_id, idx) => {
            const molecule = this.props.pointsToMolecules[point_id];

            this.setState(prevState => {
                // add physchem properties
                Object.keys(molecule.properties).forEach(propName => prevState.data.points[point_id].features.push(molecule.properties[propName]));

                // add activities
                const activities_map = {};
                Object.keys(molecule.activities).forEach(actset_id => {
                    const activities = molecule.activities[actset_id];
                    activities.forEach(activity => {
                        if (!activities_map[activity.type.id]) {
                            activities_map[activity.type.id] = [];
                        }
                        activities_map[activity.type.id].push(activity.value);
                    });
                });
                activity_types.forEach(type_id => {
                   if (activities_map[type_id]) {
                       const average = activities_map[type_id].reduce((a, b) => a + b) / activities_map[type_id].length;
                       prevState.data.points[point_id].features.push(average)
                   } else {
                       prevState.data.points[point_id].features.push(null);
                   }
                });

                prevState.parsedMols = idx+1;
                return prevState;
            });
        });
    }

    drawMap() {
        window.chemspace = new window.ChemSpace({ //instantiate ChemSpace
            target: "chemspace", // the ID of target HTML element
            colors: PLOTLY_COLORS,
            compounds: {
                draw: true,
                size: 1,
                tooltip_compound_size: 400,
            },
            color: {
                index: "category"
            },
            // point_size: {
            //     scale: {min: 4, middle: 8, "max": 12}
            // }
        });

        window.chemspace.read_data(this.state.data); // read data
        window.chemspace.draw(); //draw chemical space
        this.setState({mapDrawn: true});

        // register events
        window.chemspace.events.point_tooltip = (point_ids, color, evt) => {
            this.props.onMolHover(this.props.pointsToMolecules[point_ids[0]]);
            return window.chemspace._get_point_tooltip(evt);
        };
        window.chemspace.events.points_selection = (point_ids) => {
            this.props.onMolsSelect(point_ids.map(point_id => this.props.pointsToMolecules[point_id]));
        }
    }



    render() {
        if (!this.state.molsParsed) {
            return (
                <React.Fragment>
                    {
                        !this.props.pointsFinishedLoading ? (
                            <React.Fragment>
                                <div><p>Loading map data...</p></div>
                                <Progress color="info" value={100 * this.countPropsPoints(this.props.points) / this.props.pointsTotal} />
                            </React.Fragment>
                        ) : null
                    }
                    <div><p>Fetching molecules... ({Object.keys(this.props.pointsToMolecules).length}/{this.props.pointsTotal})</p></div>
                    <Progress color="info" value={100 * Object.keys(this.props.pointsToMolecules).length / this.props.pointsTotal} />
                </React.Fragment>
            )
        }

        return (
            <div id="chemspace" ref="chemspace">
                <div>Attaching molecule data: {Object.keys(this.props.pointsToMolecules).length}/{this.props.pointsTotal}</div>
            </div>
        )
    }
}

export default ChemSpacePlot;