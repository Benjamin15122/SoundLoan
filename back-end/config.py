import os
basedir = os.path.abspath(os.path.dirname(__file__))
URI_FORMAT = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'


class Config(object):
    HOST = "0.0.0.0"
    PORT = 5000

    SECRET_KEY = "gTzSygPGe^#v6N7W"  # used for password encryption

    # token expiration time is set to one day
    EXPIRES_IN = 86400  # seconds of one day

    # [Mysql]
    # MYSQL_USER = 'root'
    # MYSQL_PASSWD = '123456'
    # MYSQL_HOST = '192.168.255.128'
    # MYSQL_PORT = 3306
    # MYSQL_DATABASE = 'sound_loan'
    ## TODO: 本地测试时配置自己的mysql参数
    MYSQL_USER = 'root'
    MYSQL_PASSWD = 'root'
    MYSQL_HOST = '127.0.0.1'
    MYSQL_PORT = 3306
    MYSQL_DATABASE = 'sound_loan'

    # example 'mysql+pymysql://mdpmonitor:X7_mJw12m8UW@168.61.2.7:3306/mdpmonitor?charset=utf8'
    SQLALCHEMY_DATABASE_URI = URI_FORMAT.format(MYSQL_USER, MYSQL_PASSWD, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE)
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    # Parameters for loan matching
    SIGMOID_RATIO = 0.9
    LINEAR_LAXITY = 0.3

    # client ID and secret for citi api
    client_id = 'd104de7d-07ad-4700-b7c8-7330f93643cf'
    client_secret = 'jA2pX6hM3sF2oM3xD1eT5eB4xP3fR1kA7dG8yP1eY4vH3sU4jD'

    # recommendation system update data everyday
    K_USERS, K_PRODUCTS = 5, 20
    JOBS = [
        {  # 每隔一天执行一次
            'id': 'Job1: Update_recommendation_model',
            #'func': 'algorithm.loan_recommendation.recommendation_userbased:update_model',  # 方法名
            'func': 'utils.recommendation_userbased_utils:update_model',
            # 'args': (K_USERS, K_PRODUCTS),  # 入参
            'trigger': 'interval',  # interval表示循环任务
            'seconds': 24*60*60,
        }
    ]
