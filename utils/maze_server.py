import json
import time
import threading
from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
from SocketServer import ThreadingMixIn
import sqlite3
import urlparse
import subprocess


class Maze_server(BaseHTTPRequestHandler):
    def do_GET(self):
        print "=================================================="
        print self.command, self.path, self.headers['user-agent']

        type = "text"
        w = 10
        h = 10

        try:
          from urlparse import urlparse
          query = urlparse(self.path).query
          query_components = dict(qc.split("=") for qc in query.split("&"))
          type = query_components.get("type", "text")
          w = query_components.get("w", 10)
          h = query_components.get("h", 10)
        except:
          print "Error parsing query string"

	res = subprocess.check_output('python maze.py ' + str(type) + ' ' + str(w) + ' ' + str(h), shell=True)

        if res:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(res)
        else:
            self.send_response(404)
        print "=================================================="

def start_server(handler, host, port):
    httpd = HTTPServer((host, port), handler)
    try:
        httpd.serve_forever()
    finally:
        httpd.server_close()

if __name__ == '__main__':
    start_server(Maze_server, '0.0.0.0', 3001)
