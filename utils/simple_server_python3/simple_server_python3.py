import random
from http.server import BaseHTTPRequestHandler, HTTPServer

ADDR = "127.0.0.1"
PORT = 8080

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        print('command: %s' % self.command)
        print('path: %s' % self.path)
        print('version: %s' % self.request_version)
        print('headers: %s' % self.headers)

        path = self.path
        if path == '/':
            path = '/index.html'

        if path == '/random':
            self.send_response(200, 'random')
            self.end_headers()
            content = str(random.randint(1000, 9000))
            self.wfile.write(bytes(content, 'utf-8'))
            return

        try:
            with open('.' + path) as f:
                # status code
                self.send_response(200, 'Hola!')
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

        # self.send_header('Access-Control-Allow-Credentials', 'true')
        # self.send_header('Access-Control-Allow-Origin', '*')
        # self.end_headers()

        content_length = int(self.headers['content-length'])
        body = self.rfile.read(content_length).decode('utf-8')
        self.send_response(200, 'ok')
        self.end_headers()
        self.wfile.write(bytes(body, 'utf-8'))



server = HTTPServer((ADDR, PORT), RequestHandler)
print("Server running in %s:%s" % (ADDR, PORT))
server.serve_forever()
