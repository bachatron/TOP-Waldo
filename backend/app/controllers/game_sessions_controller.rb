class GameSessionsController < ApplicationController
  # POST /game_sessions
  # Called when user loads the game — starts the timer
  def create
    session = GameSession.create!(
      started_at: Time.current,
      token: SecureRandom.hex(16)
    )
    render json: { id: session.id, token: session.token }
  end

  # POST /game_sessions/:id/check
  # Called when user selects a character — validates the click
  def check
    session = find_session
    return if session.nil?

    character = Character.find_by(id: params[:character_id])
    if character.nil?
      render json: { error: "Character not found" }, status: :not_found and return
    end

    x = params[:x].to_f
    y = params[:y].to_f

    correct = x.between?(character.x_min, character.x_max) &&
              y.between?(character.y_min, character.y_max)

    render json: { correct: correct, character_id: character.id }
  end

  # PATCH /game_sessions/:id/complete
  # Called when all characters are found — saves score and name
  def complete
    session = find_session
    return if session.nil?

    if session.completed_at.present?
      render json: { error: "Session already completed" }, status: :unprocessable_entity and return
    end

    session.update!(
      completed_at: Time.current,
      player_name: params[:player_name]
    )

    elapsed = (session.completed_at - session.started_at).round(2)
    render json: { time: elapsed, player_name: session.player_name }
  end

  private

  def find_session
    session = GameSession.find_by(id: params[:id], token: params[:token])
    if session.nil?
      render json: { error: "Session not found" }, status: :not_found
      return nil
    end
    session
  end
end