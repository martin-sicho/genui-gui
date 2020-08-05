import React from 'react';
import {PLOTLY_COLORS} from "../../../../genui";

class ChemSpacePlot extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                points: {},
                compounds: {},
                paths: [],
                feature_names: [],
                categories: [],
            },
            revision: 0,
            lastIndex: {},
            pointsLoaded: false,
            mapDrawn: false
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
                        smiles: convertedPoints[key].smiles
                    });
                    const category = prevState.data.categories.find(category => category.id === molset.id);
                    category.points = category.points.concat(Object.keys(convertedPoints));
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
        }, () => {
            if (this.props.pointsLoaded && !this.state.mapDrawn) {
                this.drawMap();
            }
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
            categories: point.compoundSets
        }
    }

    drawMap() {
        window.chemspace = new window.ChemSpace({ //instantiate ChemSpace
            target: "chemspace", // the ID of target HTML element
            colors: PLOTLY_COLORS,
            compounds: {
                draw: true,
                size: 1,
                tooltip_compound_size: 400,
            }
        });

        window.chemspace.read_data(this.state.data); // read data
        window.chemspace.draw(); //draw chemical space
        this.setState({mapDrawn: true})
    }



    render() {
        return (
            <div id="chemspace" ref="chemspace">
                Loading points: {this.countPropsPoints(this.props.points)})
            </div>
        )
    }
}

export default ChemSpacePlot;