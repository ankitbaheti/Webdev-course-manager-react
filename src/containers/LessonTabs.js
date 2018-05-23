import React from 'react';
import LessonService from '../services/LessonService';
import LessonTabItem from '../components/LessonTabItem'

class LessonTabs extends React.Component {

    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.state = {
            moduleId: '',
            lessons: [],
            lesson: {
                title: ''
            }
        }
    }

    componentDidMount(){
        this.setModuleId(this.props.moduleId);
    }

    componentWillReceiveProps(newProps){
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.moduleId);
    }

    setLessonTitle(event) {
        this.setState({lesson: {
                title: event.target.value
            }
        });
    }

    createLesson(){
        this.lessonService
            .createLesson(this.state.moduleId, this.state.lesson)
            .then(() => this.findAllLessonsForModule(this.state.moduleId));
    }

    setModuleId(moduleId){
        this.setState({moduleId: moduleId});
    }

    findAllLessonsForModule(moduleId){
        this.lessonService
            .findAllLessonsForModule(moduleId)
            .then((lessons) => {this.setState({lessons: lessons})});
    }

    deleteLesson(lessonId){
        if(window.confirm("Do you want to delete this lesson?")) {
            this.lessonService
                .deleteLesson(lessonId)
                .then(() => this.findAllLessonsForModule(this.state.moduleId))
        }
    }

    renderListOfLesson() {
        let lessons =
            this.state.lessons.map((lesson) => {
                return (<LessonTabItem key={lesson.id}
                                        lesson={lesson}
                                        delete={this.deleteLesson}/>)
            });
        return lessons;
    }

    render() {
        return (
            <div>
                <input placeholder="New Module Name"
                       className="form-control mr-sm-2 mb-2"
                       onChange={this.setLessonTitle}>
                </input>
                <button type="button"
                        className="btn btn-outline-primary btn-block"
                        onClick={this.createLesson}>
                    Create
                </button>
                <ul className="nav nav-tabs">
                    {this.renderListOfLesson()}
                </ul>
            </div>
        )
    }
}

export default LessonTabs;