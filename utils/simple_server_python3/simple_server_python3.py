import random
from http.server import BaseHTTPRequestHandler, HTTPServer

ADDR = "0.0.0.0"
<<<<<<< HEAD
PORT = 80
=======
PORT = 7000
>>>>>>> 5b683e120a52e88fc731c075112ce952d12240a2

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        print('command: %s' % self.command)
        print('path: %s' % self.path)
        print('version: %s' % self.request_version)
        print('headers: %s' % self.headers)

        path = self.path
        if path == '/':
            path = '/index.html'

        try:
            with open('.' + path) as f:
                # status code
                self.send_response(200, 'OK')
                # headers
                self.send_header('Im-a-Header', 'wooo')
                self.end_headers()
                self.wfile.write(bytes(f.read(), 'utf-8'))
        except FileNotFoundError:
            self.send_response(404, 'Not Found')
            self.end_headers()
            self.wfile.write(bytes('NOT FOUND', 'utf-8'))

    def do_POST(self):
        print('command: %s' % self.command)
        print('path: %s' % self.path)
        print('version: %s' % self.request_version)
        print('headers: %s' % self.headers['content-length'])

        content_length = int(self.headers['content-length'])
        body = self.rfile.read(content_length).decode('utf-8')

        response = ""
        try:
          mapint = list(map(int, list(a)))
          num1 = sum(mapint)
          num2 = mapint[0] + 1
          num3 = mapint[1] + 2
          num4 = mapint[2] + 3
          response = "" + num1 + "" + num2 + "" + num3 + "" + num4
        except:
          self.send_response(404, 'Not Found :(')
          self.end_headers()
          self.wfile.write(bytes("Not a number:" + body, 'utf-8'))
          return

        self.send_response(200, 'ok')
        self.end_headers()
        self.wfile.write(bytes(response, 'utf-8'))



server = HTTPServer((ADDR, PORT), RequestHandler)
print("Server running in %s:%s" % (ADDR, PORT))
server.serve_forever()
