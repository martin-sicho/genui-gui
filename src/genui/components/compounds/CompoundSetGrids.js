import React from "react";

function CompoundSetsGrids(props) {
    const molsets = props.compoundSets;
    const classToComponentNoIgnore = props.classToComponentNoIgnore
    const classToComponent = classToComponentNoIgnore ? classToComponentNoIgnore : props.classToComponent;

    const tabs = [];
    Object.keys(molsets).forEach(MolSetClass => {
        if (classToComponent.hasOwnProperty(MolSetClass)) {
            const MolsetComponent = classToComponent[MolSetClass];
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