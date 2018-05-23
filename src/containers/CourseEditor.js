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
        document.body.style.backgroundColor = "#6c757d";
        return(
            <Router>
                <div style={{ height: '100%'}} >
                    <div className="bg-dark text-white container-fluid">
                        <h1>{this.state.course.title}</h1>
                    </div>
                    <div className="row" style={{height: '100%'}}>
                        <div className="col-4 bg-dark text-white"  style={{height: '100%'}}>
                            <ModuleList courseId={this.state.courseId} courseTitle={this.state.course.title}/>
                        </div>
                        <div className="col-8 text-white"  style={{height: '100%', width: '100%'}}>
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