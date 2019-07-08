import socketserver

PORT = 8080
class Handler(socketserver.StreamRequestHandler):
  def handle(self):
    print("=============================================")
    print("Recieved one request from {}".format(self.client_address))
    msg = self.rfile.readline()
    print("Data:")
    print(msg)
    self.wfile.write("Hello world HTTP\n".encode())
    print("=============================================")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
  print("serving at port", PORT)
  httpd.serve_forever()