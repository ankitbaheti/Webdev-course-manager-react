import React from 'react';
import {Link} from 'react-router-dom';

class LessonTabItem extends React.Component {

    render() {
        return (
            <li className="nav-item">
                <div>
                    <a className="nav-link text-dark active">
                        <Link
                            to={`/course/${this.props.courseId}/edit/${this.props.moduleId}/edit/${this.props.lesson.id}/edit`}>

                            {this.props.lesson.title}

                        <span className="float-right">
                            <i className="fa fa-trash ml-2" onClick={() => this.props.delete(this.props.lesson.id)}></i>
                        </span>
                        </Link>
                    </a>
                </div>
            </li>
        );
    }
}

export default LessonTabItem;