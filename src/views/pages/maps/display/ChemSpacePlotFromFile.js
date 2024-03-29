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
                tooltip_compound_size: 250,
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
                error: `Fatal error while rendering the map. No ChemSpace.js 
                JSON file found for "${this.props.selectedMap.name}". This
                map is probably not completed, yet. Check the creator 
                progress or come back later and refresh the page.`
            });
            return
        }
        window.chemspace.read_data_from_file(this.props.selectedMap.chemspaceJSON.file); // read data
        if (!window.chemspace.data) {
            this.setState({
                error: `Could not load any structures from the supplied ChemSpace.js 
                JSON file for "${this.props.selectedMap.name}". This
                map is probably not completed, yet. Check the creator 
                progress or come back later and refresh the page.`
            });
            return
        }
        const disabled_feature = "--- Disabled ---";
        window.chemspace.add_feature({name : disabled_feature, point2value : {}});
        window.chemspace.update_settings({point_size: {index: window.chemspace.data.feature_names.indexOf("--- Disabled ---")}})
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
            <React.Fragment>
                {
                    !this.state.mapDrawn ? <div>Fetching map data...</div> : null
                }
                <div id="chemspace" ref="chemspace" />
                {
                    this.state.error ? <div>{this.state.error}</div> : null
                }
                <div>
                    <p className="text-muted">Powered By <a target='_blank' rel="noopener noreferrer" href='https://openscreen.cz/software/chemspace/home/'>ChemSpace.js</a></p>
                </div>
            </React.Fragment>
        )
    }
}

export default ChemSpacePlotFromFile;