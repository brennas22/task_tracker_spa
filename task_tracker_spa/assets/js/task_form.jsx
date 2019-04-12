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
            <input id="name_field" onChange={(ev) => root.update_task_form({name: ev.target.value})} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Task description</label>
            <textarea onChange={(ev) => root.update_task_form({desc: ev.target.value})} className="form-control" id="desc" rows="3"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="user">Assign user </label>
            <select onChange={(ev) => root.update_task_form({user_id: ev.target.value})} id="user" className="form-control">
              {list_of_users}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="time">Time </label>
            <input id="time" type="number" onChange={(ev) => root.update_task_form({time: ev.target.value})} className="form-control" step="15"/>
            <small id="time_help" className="form-text text-muted">Enter time in increments of 15.</small>
          </div>

          <div className="form-group">
          <label htmlFor="complete">Task complete </label>
          <select onChange={(ev) => root.update_task_form({complete: ev.target.value})} id="complete">
            <option value="false"> No </option>
            <option value="true"> Yes </option>
          </select>
          </div>

          <button  className="btn space btn-primary">Save</button>

        </form>
        </div>

        <Link to={"/"} >Back</Link>
      </div>
  );
}
