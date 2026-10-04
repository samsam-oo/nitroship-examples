defmodule PhoenixExampleWeb.HelloController do
  use PhoenixExampleWeb, :controller

  def index(conn, _params) do
    json(conn, %{
      message: "Hello Phoenix from Nitroship",
      framework: "Phoenix",
      time: DateTime.utc_now() |> DateTime.to_iso8601()
    })
  end
end
