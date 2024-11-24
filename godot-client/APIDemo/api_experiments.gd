extends HTTPRequest

@export var server_url = "http://192.168.1.224:8080"


func _ready():
	# Create an HTTP request node and connect its completion signal.
	var http_request = HTTPRequest.new()
	add_child(http_request)
	http_request.request_completed.connect(self._http_request_completed)

	# Perform a GET request. The URL below returns JSON as of writing.
	var error = http_request.request(server_url + "/api/v1/game")
	if error != OK:
		push_error("An error occurred in the HTTP request.")

	# var body = JSON.new().stringify({"name": "Godette"})
	# error = http_request.request("https://httpbin.org/post", [], HTTPClient.METHOD_POST, body)
	# if error != OK:
	# 	push_error("An error occurred in the HTTP request.")


# Called when the HTTP request is completed.
func _http_request_completed(result, response_code, headers, body):
	var json = JSON.new()
	json.parse(body.get_string_from_utf8())
	var response = json.get_data()
	print(response)

	# Will print the user agent string used by the HTTPRequest node (as recognized by httpbin.org).
	# print(response.headers["User-Agent"])
