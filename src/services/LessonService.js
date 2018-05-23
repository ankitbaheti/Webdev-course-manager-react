const LESSON_API_URL =
    'http://localhost:8080/api/module/MID/lesson';

const LESSON_URL = 'http://localhost:8080/api/lesson';


let _singleton = Symbol();
export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }

    findAllLessonsForModule(moduleId) {
        return fetch(
            LESSON_API_URL
                .replace('MID', moduleId))
            .then(function (response) {
                return response.json();
            })
    }

    createLesson(moduleId, lesson) {
        return fetch(LESSON_API_URL.replace('MID', moduleId),{
            body: JSON.stringify(lesson),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }

    deleteLesson(lessonId){
        return fetch(LESSON_URL + '/' + lessonId, {
            method: 'DELETE'
        })
    }
}