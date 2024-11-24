extends PanelContainer


func _on_websocket_data_recieved(data):
	$Body/Raw.text = str(data)
	print(data)

	for game in data.games:
		print(game)
		var game_item = $Body/Tree.create_item()
		game_item.set_text(0, game.name)
		for session in game.sessions:
			var session_item = $Body/Tree.create_item(game_item)
			session_item.set_text(0, session.date)


func _on_new_game_button_down():
	$Websocket.send_data({"action": "new-game"})
