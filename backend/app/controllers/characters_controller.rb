class CharactersController < ApplicationController
  def index
    # We only send name and id — never the coordinates!
    render json: Character.select(:id, :name)
  end
end