class LeaderboardController < ApplicationController
  # GET /leaderboard
  def index
    # Only completed sessions, ordered by fastest time
    entries = GameSession
      .where.not(completed_at: nil)
      .where.not(player_name: nil)
      .select(:player_name, :started_at, :completed_at)
      .sort_by { |s| s.completed_at - s.started_at }
      .first(10)
      .map do |s|
        {
          player_name: s.player_name,
          time: (s.completed_at - s.started_at).round(2)
        }
      end

    render json: entries
  end
end