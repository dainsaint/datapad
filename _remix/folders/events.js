const clients = new Set();

export async function get (req, res) {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Add client to Set
  clients.add(res);
  // broadcast("welcome");

  // Handle client disconnect
  req.on("close", () => {
    clients.delete(res);
  });
};

export async function post(req, res) {
  // broadcast(data);
};
