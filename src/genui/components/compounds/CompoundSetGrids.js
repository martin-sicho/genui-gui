import React from "react";

function CompoundSetsGrids(props) {
    const molsets = props.compoundSets;
    const definitions = props.definitions;

    const tabs = [];
    Object.keys(molsets).forEach(MolSetClass => {
        if (definitions.hasOwnProperty(MolSetClass)) {
            const MolsetComponent = definitions[MolSetClass].gridComponent;
            tabs.push({
                title: MolSetClass,
                renderedComponent: (props) => (
                    <div className={MolSetClass} id={MolSetClass}>
                        <MolsetComponent
                            {...props}
                            molsets={molsets[MolSetClass]}
                            currentMolsetClass={MolSetClass}
                        />
                    </div>
                )
            });
        } else {
            console.log(`Ignored class without a component: ${MolSetClass}`);
        }
    });

    return (
        <div className="compound-set-grids">
            {
                tabs.map(tab => <tab.renderedComponent key={tab.title} {...props}/>)
            }
            {/*<TabWidget {...this.props} tabs={tabs} activeTab={this.state.selected}/>*/}
        </div>
    );
}

export default CompoundSetsGrids;