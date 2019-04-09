defmodule TaskTrackerSpa.Repo.Migrations.CreateTask do
  use Ecto.Migration

  def change do
    create table(:task) do
      add :complete, :boolean, default: false, null: false
      add :desc, :string
      add :name, :string
      add :time, :decimal

      timestamps()
    end

  end
end
