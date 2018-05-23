import React from 'react';

class ModuleListItem extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <li className="list-group-item">
                {this.props.lesson.title}
                <span className="float-right">
                    <i className="fa fa-trash ml-2" onClick={() => this.props.delete(this.props.lesson.id)}></i>
                </span>
            </li>
        );
    }
}

export default ModuleListItem;