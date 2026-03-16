class CreateGameSessions < ActiveRecord::Migration[8.1]
  def change
    create_table :game_sessions do |t|
      t.datetime :started_at
      t.datetime :completed_at
      t.string :player_name
      t.string :token

      t.timestamps
    end
  end
end
