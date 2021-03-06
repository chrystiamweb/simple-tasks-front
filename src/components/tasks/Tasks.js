import React, { Component } from 'react';
import CreateTask from './create_tasks/CreateTasks';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from './list/List';
import Button from 'react-bootstrap/Button';

class Tasks extends Component {

   constructor(props){
      super(props);
      this.state = {
         tasks: []
      };
      this.loadTasks = this.loadTasks.bind(this);
   }

   
   async loadTasks(){
      let response = await fetch('http://localhost:3001/tasks');
      const tasks = await response.json();
      this.setState({ tasks: tasks });
   }

   async deleteDoneTasks() {
      if (window.confirm(`Are you sure you want to delete all done tasks ?`)) {
        await fetch(`http://localhost:3001/tasks`, {method: 'DELETE'});
        this.loadTasks();
      }
    }

   componentDidMount(){
      this.loadTasks();
   }
      
   render(){
      return (
         <Row>
         <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
            <p className="title">To-do</p>
            <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done != true)}/>
            <CreateTask loadTasks={this.loadTasks}/>
         </Col>
         <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
            <p className="title">Done</p>
            <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done != false)}/>
            <Button variant="red" className="float-right remove_tasks_btn" onClick={() => this.deleteDoneTasks()} >Remove all tasks</Button>
         </Col>
         </Row>
      );
   }
}

export default Tasks;