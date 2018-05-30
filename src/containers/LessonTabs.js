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
            courseId:'',
            lessons: [],
            lesson: {
                title: ''
            }
        }
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllLessonsForModule(newProps.moduleId);
    }

    setLessonTitle(event) {
        this.setState({
            lesson: {
                title: event.target.value
            }
        });
    }

    createLesson() {
        if (this.state.lesson.title === '') {
            this.lessonService
                .createLesson(this.state.moduleId, {
                    title: 'Default Template'
                })
                .then(() => this.findAllLessonsForModule(this.state.moduleId));
        }
        else {
            this.lessonService
                .createLesson(this.state.moduleId, this.state.lesson)
                .then(() => this.findAllLessonsForModule(this.state.moduleId));
        }
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    findAllLessonsForModule(moduleId) {
        this.lessonService
            .findAllLessonsForModule(moduleId)
            .then((lessons) => {
                this.setState({lessons: lessons})
            });
    }

    deleteLesson(lessonId) {
        if (window.confirm("Do you want to delete this lesson?")) {
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
                                       courseId={this.state.courseId}
                                       moduleId={this.state.moduleId}
                                       delete={this.deleteLesson}/>)
            });
        return lessons;
    }

    render() {
        return (
            <div style={{width: '100%', height: '100%'}}>
                <nav className="navbar navbar-dark bg-dark justify-content-between">
                    <form className="form-inline" style={{width: '100%'}}>
                        <input placeholder="New Lesson Title"
                               className="form-control"
                               onChange={this.setLessonTitle}
                               style={{width: '80%'}}/>
                        <button type="button"
                                className="btn btn-primary btn-block ml-4"
                                onClick={this.createLesson}
                                style={{width: '15%'}}>
                            Create
                        </button>
                    </form>
                </nav>
                <div className="container-fluid" style={{width: '100%', height: '100%'}}>
                    <ul className="nav nav-tabs">
                        {this.renderListOfLesson()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default LessonTabs;