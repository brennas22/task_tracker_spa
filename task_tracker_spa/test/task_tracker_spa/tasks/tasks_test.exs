defmodule TaskTrackerSpa.TasksTest do
  use TaskTrackerSpa.DataCase

  alias TaskTrackerSpa.Tasks

  describe "task" do
    alias TaskTrackerSpa.Tasks.Task

    @valid_attrs %{complete: true, desc: "some desc", name: "some name", time: "120.5"}
    @update_attrs %{complete: false, desc: "some updated desc", name: "some updated name", time: "456.7"}
    @invalid_attrs %{complete: nil, desc: nil, name: nil, time: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Tasks.create_task()

      task
    end

    test "list_task/0 returns all task" do
      task = task_fixture()
      assert Tasks.list_task() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Tasks.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = Tasks.create_task(@valid_attrs)
      assert task.complete == true
      assert task.desc == "some desc"
      assert task.name == "some name"
      assert task.time == Decimal.new("120.5")
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tasks.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, %Task{} = task} = Tasks.update_task(task, @update_attrs)
      assert task.complete == false
      assert task.desc == "some updated desc"
      assert task.name == "some updated name"
      assert task.time == Decimal.new("456.7")
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Tasks.update_task(task, @invalid_attrs)
      assert task == Tasks.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Tasks.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Tasks.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Tasks.change_task(task)
    end
  end
end
