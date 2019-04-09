defmodule TaskTrackerSpa.Repo.Migrations.CreateTask do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :complete, :boolean, default: false, null: false
      add :desc, :string, null: false
      add :name, :string, null: false
      add :time, :decimal
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:tasks, [:user_id], unique: true)
  end
end
