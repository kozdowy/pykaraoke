import os
import tornado.ioloop
import tornado.web
import tornado.websocket

from tornado.options import define, options, parse_command_line

define("port", default=8888, type=int)

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

class WebSocketHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        print "New connection"
        self.write_message(u"Welcome!")

    def on_message(self, message):
        print "New message {}".format(message)
        self.write_message(message.upper())

    def on_close(self):
        print "Connection closed"


static_path = os.path.join(os.path.dirname(__file__), "static")

app = tornado.web.Application([
    (r'/', IndexHandler),
    (r'/ws', WebSocketHandler),
    (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': static_path})
])


if __name__ == '__main__':
    app.listen(options.port)
    tornado.ioloop.IOLoop.current().start()
