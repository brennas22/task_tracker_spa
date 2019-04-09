defmodule TaskTrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :name, :string
    field :desc, :string
    field :time, :decimal
    field :complete, :boolean, default: false
    belongs_to :user, TaskTrackerSpa.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :desc, :time, :complete, :user_id])
    |> validate_required([:name, :desc, :time, :complete, :user_id])
  end
end
