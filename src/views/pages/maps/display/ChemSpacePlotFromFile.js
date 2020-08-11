import React from "react";
import {PLOTLY_COLORS} from "../../../../genui";

class ChemSpacePlotFromFile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mapDrawn: false,
            error: null
        }
    }

    componentDidMount() {
        this.drawMap();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedMap.id !== prevProps.selectedMap.id) {
            this.drawMap();
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
            },
            color: {
                index: "category"
            },
            // point_size: {
            //     scale: {min: 4, middle: 8, "max": 12}
            // }
        });

        if (!this.props.selectedMap.chemspaceJSON) {
            this.setState({
                error: `Fatal error while rendering the map. No ChemSpace.js JSON file found for "${this.props.selectedMap.name}".`
            });
            return
        }
        window.chemspace.read_data_from_file(this.props.selectedMap.chemspaceJSON.file); // read data
        window.chemspace.draw(); //draw chemical space
        this.setState({mapDrawn: true});

        // register events
        window.chemspace.events.point_tooltip = (point_ids, color, evt) => {
            this.props.onMolHover(window.chemspace.data.compounds[point_ids[0]].id);
            return window.chemspace._get_point_tooltip(evt);
        };
        window.chemspace.events.points_selection = (point_ids) => {
            this.props.onMolsSelect(point_ids.map(point_id => window.chemspace.data.compounds[point_id].id));
        }
    }

    render() {
        return (
            <div id="chemspace" ref="chemspace">
                {
                    this.state.error ? <div>{this.state.error}</div> : null
                }
            </div>
        )
    }
}

export default ChemSpacePlotFromFile;