defmodule TaskTrackerSpaWeb.PageController do
  use TaskTrackerSpaWeb, :controller

  def index(conn, _params) do
    task = TaskTrackerSpa.Tasks.list_task()
    |> Enum.map(&(Map.take(&1, [:id, :name, :desc, :time, :complete, :user_id])))
    render(conn, "index.html", tasks: task)
  end
end
