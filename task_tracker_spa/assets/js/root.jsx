
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function root_init(node) {
  let tasks = window.tasks;
  console.log("window tasks:" + tasks);

  ReactDOM.render(<Root tasks={tasks} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
    };
    console.log("state tasks:" + this.state.tasks);

    //this.fetch_products();
  }

  fetch_products() {
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

  render() {
    return <div>
      <h1>hi</h1>
      <TaskList tasks={this.state.tasks} />
    </div>;
  }
}

function TaskList(props) {
  let tasks = _.map(props.tasks, (t) => <Task key={t.id} task={t} />);
  return <div className="row">
    {tasks}
  </div>;
}

function Task(props) {
  let {task} = props;
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.name}</h2>
      <p className="card-text">{task.desc}</p>
    </div>
  </div>;
}
