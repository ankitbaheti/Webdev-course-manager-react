import React from 'react';
import ModuleList from './ModuleList';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ModuleEditor from './ModuleEditor';
import CourseService from '../services/CourseService';

class CourseEditor extends React.Component{

    constructor(props){
        super(props);
        this.courseService = CourseService.instance;
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {
            courseId:'',
            course:''
        };
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        this.getCourse(this.props.match.params.courseId);
    }

    getCourse(courseId){
        this.courseService
            .findCourseById(courseId)
            .then((course) => {
                this.setState({course: course})
            })
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    render(){
        return(
            <Router>
                <div className="container-fluid">
                    <h2>Editing course: {this.state.course.title}</h2>
                    <div className="row">
                        <div className="col-4">
                            <ModuleList courseId={this.state.courseId} courseTitle={this.state.course.title}/>
                        </div>
                        <div className="col-8">
                            <Route path="/course/:courseId/edit/:moduleId/edit"
                                   component={ModuleEditor}>
                            </Route>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default CourseEditor;