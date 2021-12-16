/**
 * This is the doc comment for inmammoryDB.ts
 * Specify this is a module comment and rename it to my-module:
 * @module Task_Database
 */
import Task from './task.model.js'

const database: Array<Task> = [
    {
        "id": "c37fcf3a-7b26-437d-b033-ca8c77f926bb",
        "title": "Important task",
        "order": 1,
        "description": "Important Lorem ipsum",
        "userId": "87ef73a1-d7b8-4941-bd4e-424e58a0b3d5",
        "boardId": "1414302d-aa90-4311-964c-de4d15246e9e",
        "columnId": "2"
    }
]

export default database