import React from 'react'
import LessonTabs from './LessonTabs'
import ModuleService from '../services/ModuleService';
import CourseService from '../services/CourseService';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {widgetReducer} from "../reducers/widgetReducer"
import App from './widgetList'



let store = createStore(widgetReducer);

class ModuleEditor extends React.Component{

    constructor(props){
        super(props);
        this.moduleService = ModuleService.instance;
        this.courseService = CourseService.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setModule = this.setModule.bind(this);
        this.setCourse = this.setCourse.bind(this);
        this.state = {
            courseId: '',
            moduleId: '',
            module:'',
            course:''
        }
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId);
        this.setCourse(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
        this.setModule(this.props.match.params.moduleId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.match.params.courseId);
        this.setCourse(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
        this.setModule(newProps.match.params.moduleId);
    }

    setCourse(courseId){
        this.courseService
            .findCourseById(courseId)
            .then((course) => {
                this.setState({course: course})
            })
    }

    setModule(moduleId){
        this.moduleService
            .findModuleById(moduleId)
            .then((module) => {
                this.setState({module: module})
            })
    }

    setCourseId(courseId){
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId){
        this.setState({moduleId: moduleId});
    }

    render(){
        return(
            <Router>
                <div className="bg-dark container-fluid p-2" style={{height: '100%'}}>
                    <h4 className="container-fluid">Editing Module: {this.state.module.title}</h4>
                    <div>
                        <LessonTabs courseId = {this.state.courseId} moduleId={this.state.moduleId}/>
                    </div>
                    <div style={{height: '100%'}}>
                        <Provider store = {store}>
                            <Route path="/course/:courseId/edit/:moduleId/edit/:lessonId/edit"
                                   component={App}/>
                        </Provider>
                    </div>
                </div>
            </Router>
        )
    }
}

export default ModuleEditor;