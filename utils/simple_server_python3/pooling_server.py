import json
import time
import threading
from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
from SocketServer import ThreadingMixIn
import sqlite3
import urlparse

message = None
conn = None

class Chat_server(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_POST(self):
        print "=================================================="
        print self.command, self.path, self.headers['user-agent']
        length = int(self.headers['Content-Length'])
        body = self.rfile.read(length)
        path = self.path
        if path.startswith('/'):
            path = path[1:]
        res = self.perform_operation(path, body)
        if res:
            self.send_response(200)
            self.send_header('Content-type', 'application/javascript')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(res)
        else:
            self.send_response(404)
        print "=================================================="

    def do_GET(self):
        print "=================================================="
        print self.command, self.path, self.headers['user-agent']
        conn_get = sqlite3.connect('chat.db')
        conn_get.row_factory = sqlite3.Row
        c = conn_get.cursor()
        c.execute("SELECT rowid, * FROM chat")
        result = c.fetchall()
        conn_get.close()
        res = json.dumps([dict(row) for row in result])

        if res:
            self.send_response(200)
            self.send_header('Content-type', 'application/javascript')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(res)
        else:
            self.send_response(404)
        print "=================================================="

    def perform_operation(self, oper, body):
        if oper=='poll':
            return message.wait(body)
        else:
            return message.post(body)


class Message():
    def __init__(self):
        self.data = ''
        self.time = 0
        self.event = threading.Event()
        self.lock = threading.Lock()
        self.event.clear()
        self.message = {}
        self.id = None

    def wait(self, last_mess=None):
        if last_mess and message.id != last_mess:
            return json.dumps(message.message)
        self.event.wait()
        return json.dumps(message.message)

    def post(self, data):
        with self.lock:
            self.data = data
            self.time = time.time()
            self.event.set()
            self.event.clear()
            qs = dict(urlparse.parse_qs(data))
            self.message = {
                "username":  qs['username'][0],
                "chatmessage":  qs['chatmessage'][0]
            }
            print "Data received: ", self.message
            conn_thread = sqlite3.connect('chat.db')
            cursor=conn_thread.cursor()
            cursor.execute("INSERT INTO chat VALUES ('" + self.message['username'] + "', '" + self.message['chatmessage'] + "')")
            self.id = cursor.lastrowid
            print('LAST ROW ID', self.id)
            conn_thread.commit()
            conn_thread.close()
        return 'ok'


ThreadingMixIn.daemon_threads = True
class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Handle requests in a separate thread."""


def start_server(handler, host, port):
    global message
    global conn
    conn = sqlite3.connect('chat.db')
    conn.execute('''CREATE TABLE IF NOT EXISTS chat (username text, chatmessage text)''')
    conn.close()
    message = Message()

    httpd = ThreadedHTTPServer((host, port), handler)
    print 'Serving at http://%s:%s' % (host, port)
    try:
        httpd.serve_forever()
    finally:
        httpd.server_close()


if __name__ == '__main__':
    start_server(Chat_server, '127.0.0.1', 7000)
