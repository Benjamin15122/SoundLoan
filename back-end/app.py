import os
import logging

from app import app, db


if __name__ == "__main__":
    host = app.config['HOST']
    port = app.config['PORT']
    app.run(host=host, port=port)
