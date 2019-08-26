import os
import logging

from app import app, db

from apscheduler.schedulers.background import BackgroundScheduler
from utils.news_crawl_utils import get_search_results, update_news

if __name__ == "__main__":
    host = app.config['HOST']
    port = app.config['PORT']
    app.run(host=host, port=port)
    background_scheduler = BackgroundScheduler()
    background_scheduler.add_job(update_news, 'cron', hour='8', minute='0', second='0')
    background_scheduler.start()