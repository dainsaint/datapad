extends PanelContainer


func _on_websocket_data_recieved(data):
	$Body/Raw.text = str(data)
	print(data)
	for game in data.games:
		
		var game_item = $Body/Tree.create_item()
		game_item.set_text(0,game.date)
		for session in game.sessions:
			var session_item = $Body/Tree.create_item(game_item)
			session_item.set_text(0,session.date)
