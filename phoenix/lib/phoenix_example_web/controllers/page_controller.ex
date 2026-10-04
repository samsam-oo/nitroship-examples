defmodule PhoenixExampleWeb.PageController do
  use PhoenixExampleWeb, :controller

  def home(conn, _params) do
    render(conn, :home, server_time: DateTime.utc_now() |> DateTime.to_iso8601())
  end
end
