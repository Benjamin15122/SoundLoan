import os
from utils.alipay_api_utils import *
basedir = os.path.abspath(os.path.dirname(__file__))
URI_FORMAT = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'


class Config(object):
    HOST = "127.0.0.1"
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
        },
        # {
        #     'id': 'Job1: Update_recommendation_model',
        #     'func': 'utils.credit_score_utils:update_credit_scores',
        #     'trigger': 'interval',  # interval表示循环任务
        #     'seconds': 24 * 60 * 60,
        # }
    ]

    # 支付宝配置
    BASE_DIR = './'
    # 初始化操作
    # 设置秘钥公钥的存放路径
    app_private_key_path = os.path.join(BASE_DIR, 'external_api_keys/myapp_private_key.txt')
    alipay_public_key_path = os.path.join(BASE_DIR, 'external_api_keys/alipay_public_key.txt')
    # TODO：前端完成后修改这个地址
    redirect_url = "http://47.103.113.144:"+str(PORT)+"/alipay/completed"
    notification_url = "http://47.103.113.144:"+str(PORT)+"/alipay/notification"
    # 根据自己申请的进行设置
    alipay = AliPay(
        appid="2016101400682600",  # 设置签约的appid
        app_notify_url=notification_url,  # 异步支付通知url
        app_private_key_path=app_private_key_path,  # 设置应用私钥
        alipay_public_key_path=alipay_public_key_path,  # 支付宝的公钥，验证支付宝回传消息使用，不是你自己的公钥,
        debug=True,  # 默认False,            # 设置是否是沙箱环境，True是沙箱环境
        return_url=redirect_url,  # 同步支付通知url,在这个页面可以展示给用户看，只有付款成功后才会跳转
    )

    signature_server = 'http://47.103.113.144:6008'
    # 爬取地址暂定为这个
    COURT_URL_TEMPLATE = 'https://rmfygg.court.gov.cn/web/rmfyportal/noticeinfo'
