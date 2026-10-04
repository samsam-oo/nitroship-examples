class HomeController < ApplicationController
  def index
    @server_time = Time.current.utc.iso8601
  end

  def hello
    render json: {
      message: "Hello Rails from Nitroship",
      framework: "Rails",
      time: Time.current.utc.iso8601
    }
  end
end
