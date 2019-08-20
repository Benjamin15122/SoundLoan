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
    MYSQL_USER = 'root'
    # MYSQL_PASSWD = '123456'
    # MYSQL_HOST = '192.168.255.128'
    # MYSQL_PORT = 3306
    # MYSQL_DATABASE = 'sound_loan'
    MYSQL_PASSWD = 'yanfan'
    MYSQL_HOST = '127.0.0.1'
    MYSQL_PORT = 3308
    MYSQL_DATABASE = 'sound_loan'

    # example 'mysql+pymysql://mdpmonitor:X7_mJw12m8UW@168.61.2.7:3306/mdpmonitor?charset=utf8'
    SQLALCHEMY_DATABASE_URI = URI_FORMAT.format(MYSQL_USER, MYSQL_PASSWD, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE)
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    # Parameters for loan matching
    SIGMOID_RATIO = 0.9
    LINEAR_LAXITY = 0.3
