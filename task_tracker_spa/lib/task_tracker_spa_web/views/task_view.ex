defmodule TaskTrackerSpaWeb.TaskView do
  use TaskTrackerSpaWeb, :view
  alias TaskTrackerSpaWeb.TaskView

  def render("index.json", %{task: task}) do
    %{data: render_many(task, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      complete: task.complete,
      desc: task.desc,
      name: task.name,
      time: task.time}
  end
end
