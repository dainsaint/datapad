extends Node

signal event_received(data: String)
signal connection_error

var client := HTTPClient.new()
var client_is_connected := false
var server_url := "http://localhost"  #:4000/api/v1"
var response_buffer := ""


func _ready():
	# Start connection
	connect_to_server()


func _process(_delta):
	client.poll()
	# print(client.get_status())

	match client.get_status():
		HTTPClient.STATUS_CONNECTING, HTTPClient.STATUS_RESOLVING:
			print("workin on it...")
			return

		HTTPClient.STATUS_CONNECTED:
			# print("connected fo real")
			if not client_is_connected:
				_send_initial_request()

		HTTPClient.STATUS_BODY:
			var chunk = client.read_response_body_chunk()
			if chunk.size() > 0:
				# Convert chunk to string and add to buffer
				var chunk_text = chunk.get_string_from_utf8()
				response_buffer += chunk_text

				# Process any complete messages in buffer
				_process_buffer()

		HTTPClient.STATUS_DISCONNECTED:
			print("Disconnected - attempting to reconnect...")
			client_is_connected = false
			await get_tree().create_timer(3.0).timeout
			connect_to_server()

		HTTPClient.STATUS_CONNECTION_ERROR:
			print("Error occurred")
			emit_signal("connection_error")
			client_is_connected = false


func connect_to_server():
	print("trying to connect")
	var err = client.connect_to_host(server_url.split("/")[2], 4000)
	if err != OK:
		print("Failed to connect to host")
		emit_signal("connection_error")
	else:
		print("connected!")


func _send_initial_request():
	var headers = ["Accept: text/event-stream", "Cache-Control: no-cache"]
	print("requesting")
	print(client.connection)
	var err = client.request(HTTPClient.METHOD_GET, str(server_url, "/api/v1/events"), headers)
	if err != OK:
		print("Failed to send request")
		return

	client_is_connected = true


func _process_buffer():
	# Split buffer into messages (separated by double newlines)
	var messages = response_buffer.split("\n\n")
	print(messages)

	# Keep last incomplete message in buffer
	if not response_buffer.ends_with("\n\n"):
		response_buffer = messages[-1]
		messages.pop_back()
	else:
		response_buffer = ""

	# Process complete messages
	for msg in messages:
		if msg.begins_with("data: "):
			var data = msg.substr(6)  # Remove "data: " prefix
			emit_signal("event_received", data)
