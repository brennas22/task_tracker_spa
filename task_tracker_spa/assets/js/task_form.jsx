import React from 'react';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function TaskForm(props) {
  let {root, tasks, users} = props;
  let list_of_users = _.map(root.state.users, (user) => <option key={user.id} value={user.id}> {user.email} </option>);


  return (
    <div className="container">
    <div className="col-4">
        <div className="row">
          <h2></h2>
        </div>
        <form onSubmit={root.new_task}>
          <div className="form-group">
            <label htmlFor="name_field">Task name </label>
            <input id="name_field" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Task description</label>
            <textarea className="form-control" id="desc" rows="3"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="user">Assign user </label>
            <select id="user" className="form-control">
              {list_of_users}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="time">Time </label>
            <input id="time" className="form-control" step="15"/>
            <small id="time_help" className="form-text text-muted">Enter time in increments of 15.</small>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
            <label className="form-check-label" htmlFor="defaultCheck1">
            Task Complete
            </label>
          </div>

          <button className="btn space btn-primary">Save</button>

        </form>
        </div>

        <Link to={"/"} >Back</Link>
      </div>
  );
}
