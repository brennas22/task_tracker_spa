import React from 'react';
import _ from 'lodash';


export default function TaskList(props) {
  let {root, tasks} = props;
  let items = _.map(tasks, (item) => <Task key={item.id} item={item} root={root} />);
  return <div>
  <div className="row">
      <button className="btn btn-primary">New Task</button>
      </div>
    <div className="row">

      {items}
      </div>
  </div>;
}

function Task(props) {
  let {root, item} = props;
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{item.name}</h2>
      <p className="card-subtitle mb-2 text-muted">Time: {item.time}</p>
      <p className="card-text">{item.desc}</p>
      <Complete task={item} root={root}/>

    </div>
  </div>;
}

function Complete(props) {
  let {root, task} = props;
  if (task.complete) {

    return <p className="alert alert-success">completed</p>
  } else {
    return <p className="alert alert-warning">in progress</p>

  }
}
