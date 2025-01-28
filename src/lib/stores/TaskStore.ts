import Kikuri from '../../client/kikuri'
import Heap from '../../typings/Heap'
import Task from '../mods/Task'

export default class TaskStore {
    client: Kikuri

    categories: Heap<string, Heap<string, Task>>
    tasks: Heap<string, Task>

    constructor(client: Kikuri) {
        this.client = client

        this.categories = new Heap<string, Heap<string, Task>>()
        this.tasks = new Heap<string, Task>()
    }
}