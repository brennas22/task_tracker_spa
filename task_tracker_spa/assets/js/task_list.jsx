import React from 'react';
import _ from 'lodash';


export default function TaskList(props) {
  let {root, tasks, users} = props;
  let items = _.map(tasks, (item) => <Task key={item.id} item={item} root={root} users={users} />);
  return <div>
  <div className="row">
      </div>
    <div className="row">

      {items}
      </div>
  </div>;
}

function Task(props) {
  let {root, item, users} = props;
  let itemID = item.id;
  let find_user = _.find(users, ['id', itemID]);
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{item.name}</h2>
      <p className="card-subtitle mb-2 text-muted">Time: {item.time}</p>
      <p className="card-text">{item.desc}</p>
      <p className="card-text">Assigned to: {find_user.email}</p>
      <Complete task={item} root={root}/>
      <div className="row btns">
      <button className="btn btn-danger" onClick={() => root.remove_cart_item(item.id)}>delete</button>
      <button className="btn btn-secondary" onClick={() => root.complete_item(item)}>mark complete</button>

      </div>
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
