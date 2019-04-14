
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import TaskList from './task_list';
import TaskForm from './task_form';

export default function root_init(node) {
  let tasks = window.tasks;
  ReactDOM.render(<Root tasks={tasks} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_form: {email: "", password: ""},
      session: null,
      tasks: [],
      users: [],

      task_form: {name: "", desc: "", time: "", complete: false, user_id: "1"},

    };

    this.fetch_users();
    this.fetch_tasks();

    this.new_task = this.new_task.bind(this);
  }

  update_task_form(data) {

    let form1 = _.assign({}, this.state.task_form, data);
    let state1 = _.assign({}, this.state, { task_form: form1 });
    this.setState(state1);
  }

  submit_task() {
    console.log(this.state.task_form.name);
    console.log(this.state.task_form.desc);
    console.log(this.state.task_form.time);
    console.log(this.state.task_form.complete);
    console.log(this.state.task_form.user_id);
  }



  new_task(event) {
    event.preventDefault();
  let name = this.state.task_form.name;
  let desc = this.state.task_form.desc;
  let time = this.state.task_form.time;
  let comp = this.state.task_form.complete;
  let user_id = this.state.task_form.user_id;


  $.ajax("/api/v1/tasks/", {
    method: "post",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: JSON.stringify({task: {name, desc, time, comp, user_id}}),
    error: (resp) => {
        alert(JSON.stringify(resp));
      },
    success: (resp) => {
      this.fetch_tasks();
    }
  });
}

  fetch_tasks() {

    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      },
    });
  }


  fetch_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      },
    });
  }

  login() {
  $.ajax("/api/v1/auth", {
    method: "post",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: JSON.stringify(this.state.login_form),
    success: (resp) => {
      let state1 = _.assign({}, this.state, { session: resp.data });
      this.setState(state1);
    }
  });
}



update_login_form(data) {
  let form1 = _.assign({}, this.state.login_form, data);
  let state1 = _.assign({}, this.state, { login_form: form1 });
  this.setState(state1);
}

remove_cart_item(id) {
    $.ajax("/api/v1/tasks/" + id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (_resp) => {
        let cart1 = _.filter(this.state.tasks, (item) => item.id != id);
        let state1 = _.assign({}, this.state, { tasks: cart1 });
        this.setState(state1);
      }
    });
  }



  complete_item(task) {
    task.complete = !task.complete;
    $.ajax("/api/v1/tasks/"+task.id, {
      method: "put",
      dataType: "json",
      headers: {"x-auth": this.state.session.token},
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({task}),
      success: (resp) => {
        this.fetch_tasks();
    },
  });
    }

    enter_time(task, time) {
      task.time = time;
      $.ajax("/api/v1/tasks/"+task.id, {
        method: "put",
        dataType: "json",
        headers: {"x-auth": this.state.session.token},
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({task}),
        success: (resp) => {
          this.fetch_tasks();
      },
    });
      }



  render() {
    return <div>
      <Router>
        <div>
          <Header session={this.state.session} root={this} />
          <div className="container">
          <Route path="/" exact={true} render={() =>
            <TaskList root={this} tasks={this.state.tasks} users={this.state.users} session={this.state.session} />
          } />
          <Route path="/users" exact={true} render={() =>
            <UserList users={this.state.users} />
          } />
          <Route path="/tasks/new" exact={true} render={() =>
            <TaskForm root={this} />
          } />
          </div>

        </div>
      </Router>
    </div>;

  }
}

function Header(props) {
  let {root, session} = props;
  let session_info;
  if (session == null) {
    session_info = <div className="form-inline my-2">
      <input type="email" placeholder="email"
             onChange={(ev) => root.update_login_form({email: ev.target.value})} />
      <input type="password" placeholder="password"
             onChange={(ev) => root.update_login_form({password: ev.target.value})} />
      <button className="btn btn-secondary" onClick={() => root.login()}>Login</button>
    </div>;
  }
  else {
    session_info = <div className="my-2">
      <p>Logged in as {session.user_id}</p>
    </div>
  }
  return (<div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
  <Link to={"/"} className="navbar-brand">Task Tracker</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item"><Link to={"/users"} className="nav-link">Users</Link></li>
    </ul>
    <div>
      {session_info}
    </div>
  </div>
  </div>
</nav>
  <div className="row">
  <div className="container">
  <Link to={"/tasks/new"}><button className="btn btn-primary">New Task</button></Link>
  </div>
  </div>

  </div>
)
}


function Complete(props) {
  let {task} = props;
  if (task.complete) {

    return <p className="alert alert-success">completed</p>
  } else {
    return <p className="alert alert-warning">in progress</p>

  }
}

function UserList(props) {
  let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
  return <div className="row">
    <div className="col-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>email</th>
            <th>admin?</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  </div>;
}

function User(props) {
  let {user} = props;
  return <tr>
    <td>{user.email}</td>
    <td>{user.admin ? "yes" : "no"}</td>
  </tr>;
}
