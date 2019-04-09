defmodule TaskTrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "task" do
    field :complete, :boolean, default: false
    field :desc, :string
    field :name, :string
    field :time, :decimal

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:complete, :desc, :name, :time])
    |> validate_required([:complete, :desc, :name, :time])
  end
end
