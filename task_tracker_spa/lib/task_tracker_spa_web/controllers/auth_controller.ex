defmodule TaskTrackerSpaWeb.AuthController do
  use TaskTrackerSpaWeb, :controller

  alias TaskTrackerSpa.Users
  alias TaskTrackerSpa.Users.User

  action_fallback TaskTrackerSpaWeb.FallbackController

  def authenticate(conn, %{"email" => email, "password" => password}) do
    with {:ok, %User{} = user} <- Users.authenticate_user(email, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(TaskTrackerSpaWeb.Endpoint, "user_id", user.id),
          user_id: user.id,
        }
      }

      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end
