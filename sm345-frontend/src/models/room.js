import { observable, computed, action } from "mobx";

export default class RoomModel {
    @observable todos = [];
  
    @computed
    get unfinishedTodoCount() {
      return this.todos.filter(todo => !todo.finished).length;
    }
  
    // @action
    // addTodo(title) {
    //   this.todos.push(new TodoModel(title));
    // }
}