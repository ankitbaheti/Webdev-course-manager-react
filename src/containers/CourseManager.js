import React from 'react';
import CourseList from './CourseList'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CourseService from '../services/CourseService';

class CourseManager extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <Router>
                <div className="container-fluid">
                    <Route path="/courses" component = {CourseList}>
                    </Route>
                </div>
            </Router>
        )
    }
}

export default CourseManager;