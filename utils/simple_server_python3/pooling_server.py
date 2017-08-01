import time
import threading
from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
from SocketServer import ThreadingMixIn

message = None

class Chat_server(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_POST(self):
        length = int(self.headers['Content-Length'])
        body = self.rfile.read(length)
        path = self.path
        if path.startswith('/'):
            path = path[1:]
        res = self.perform_operation(path, body)
        if res:
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(res)
        else:
            self.send_response(404)

    def do_GET(self):
        path = self.path
        if path.startswith('/'):
            path = path[1:]
        res = self.get_html(path)
        if res:
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(res)
        else:
            self.send_response(404)

    def perform_operation(self, oper, body):
        if oper=='poll':
            return message.wait(body)
        elif oper=='post':
            return message.post(body)

    def get_html(self, path):
        if path=='' or path=='index.html':
            return '''
            <body>
            <style>
            iframe {
                width: 400px;
                height: 600px;
            }
            </style>
            <iframe src="room.html"></iframe>
            <iframe src="room.html"></iframe>
            <iframe src="room.html"></iframe>
            <iframe src="room.html"></iframe>
            </body>
            '''
        elif path=='room.html':
            return '''
            <body>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
            <input id="input"/>
            <button id="post">post</button>
            <script>
            $('#post').click(function(){
                $.ajax('/post', {
                    method: 'POST',
                    timeout: 1000,
                    data: $('#input').val()
                });
            });
            var last_message = '';
            (function poll() {
                $.ajax('/poll', {
                    method: 'POST',
                    timeout: 1000*60*10, //10 minutes
                    success: function(data){
                        $("<p>"+data+"</p>").appendTo($(document.body));
                        last_message = data;
                        poll();
                    },
                    error: function(){
                        setTimeout(poll, 1000);
                    },
                    data: last_message
                });
            }());
            </script>
            </body>
            '''


class Message():
    def __init__(self):
        self.data = ''
        self.time = 0
        self.event = threading.Event()
        self.lock = threading.Lock()
        self.event.clear()

    def wait(self, last_mess=''):
        if message.data != last_mess and time.time()-message.time < 60:
            # resend the previous message if it is within 1 min
            return message.data
        self.event.wait()
        return message.data

    def post(self, data):
        with self.lock:
            self.data = data
            self.time = time.time()
            self.event.set()
            self.event.clear()
        return 'ok'


ThreadingMixIn.daemon_threads = True
class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Handle requests in a separate thread."""


def start_server(handler, host, port):
    global message
    message = Message()

    httpd = ThreadedHTTPServer((host, port), handler)
    print 'Serving at http://%s:%s' % (host, port)
    try:
        httpd.serve_forever()
    finally:
        httpd.server_close()


if __name__ == '__main__':
    start_server(Chat_server, 'localhost', 8000)
