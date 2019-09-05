import os
import logging

from flask_apscheduler import APScheduler
from flask_restful import Api
from app.loan_recommendation.routes import *
from app import app, db

api = Api(app)
api.add_resource(LoanRecommendation, '/enterprise/recommendation')

if __name__ == "__main__":
    scheduler = APScheduler()
    scheduler.init_app(app)
    scheduler.start()

    host = app.config['HOST']
    port = app.config['PORT']
    app.run(host=host, port=port)
