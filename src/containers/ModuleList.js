import React from 'react';
import ModuleService from '../services/ModuleService';
import ModuleListItem from '../components/ModuleListItem';

class ModuleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            courseId:'',
            module: {
                title: ''
            },
            modules: []
        };
        this.moduleService = ModuleService.instance;
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
    }

    componentDidMount(){
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    setModuleTitle(event) {
        this.setState({module: {
                title: event.target.value
            }
        });
    }

    createModule() {
        this.moduleService
            .createModule(this.state.courseId, this.state.module)
            .then(() => this.findAllModulesForCourse(this.state.courseId));
    }

    setCourseId(courseId){
        this.setState({courseId: courseId});
    }

    deleteModule(moduleId){
        this.moduleService
            .deleteModule(moduleId)
            .then(() => this.findAllModulesForCourse(this.state.courseId))
    }

    renderListOfModules() {
        let modules =
            this.state.modules.map((module) => {
                return (<ModuleListItem key={module.id}
                                        module={module} delete={this.deleteModule}/>)
            });
        return modules;
    }

    render(){
        return(
            <div>
                <h4>Modules List for CourseId: {this.state.courseId}</h4>
                <input placeholder="New Module Name"
                       className="form-control mr-sm-2 mb-2"
                       onChange={this.setModuleTitle}>
                </input>
                <button type="button"
                        className="btn btn-outline-primary btn-block"
                        onClick={this.createModule}>
                    Create
                </button>
                <br/>
                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
            </div>
        )
    }
}

export default ModuleList;