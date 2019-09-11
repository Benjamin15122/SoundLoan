import os
import logging

from flask_apscheduler import APScheduler
from flask_restful import Api
from app.loan_recommendation.routes import *
from app import app, db
from flask_caching import Cache
from apscheduler.schedulers.background import BackgroundScheduler
from utils.news_crawl_utils import update_news

api = Api(app)
api.add_resource(LoanRecommendation, '/enterprise/recommendation')

if __name__ == "__main__":
    scheduler = APScheduler()
    scheduler.init_app(app)
    scheduler.start()

    background_scheduler = BackgroundScheduler()
    background_scheduler.add_job(update_news, 'cron', hour='8', minute='0', second='0')
    background_scheduler.start()

    host = app.config['HOST']
    port = app.config['PORT']
    app.run(host=host, port=port)
