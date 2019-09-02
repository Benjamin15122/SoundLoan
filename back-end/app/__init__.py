from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
import os

try:
    from flask_cors import CORS
except ImportError:
    os.system('pip install flask_cors')
    from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object(Config)
db = SQLAlchemy(app)
online_users = {}

from app.manage import routes
from app.loan_match import routes
from app.loan_recommendation import routes
from app.citi_money_transfer import routes
from app.alipay_payoff import routes
from app.contract_analyze import routes
from app.loan_recommendation import routes
from models import IndividualUser, EnterpriseUser, LoanProduct, LoanRecord, Contract, LoanProductComment

#db.create_all()

# 以下数据供测试用，可以添加更多数据
db.drop_all()
db.create_all()

loan1 = LoanProduct.LoanProduct(Name=u'金利来小额贷', EnterpriseName="狼厂", AmountMin=1000, AmountMax=30000, RateMin=0.12, RateMax=0.23, DurationMin=6, DurationMax=24)
loan2 = LoanProduct.LoanProduct(Name=u'生活无忧小额贷', EnterpriseName="阿里", AmountMin=3000, AmountMax=20000, RateMin=0.13, RateMax=0.33, DurationMin=3, DurationMax=36)
loan3 = LoanProduct.LoanProduct(Name=u'要你命3000贷', EnterpriseName="狼厂", AmountMin=3000, AmountMax=300000, RateMin=0.24, RateMax=0.36, DurationMin=1, DurationMax=12)
db.session.add_all([loan1, loan2, loan3])
db.session.commit()

user1 = IndividualUser.IndividualUser(
    nickname='Lucy', password='123', sex='female',
    name='Lucy', birth='1996.01.01', residence_address='Nanjing University',
    education='bachelor', school='NJU', work_address='NJU',
    live_address='NJU', marriage='married', salary='3000',
    vehicle_property='300000', house_property='0', vehicle_loan='0', house_loan='0',
    work_year='3', job='whiteCollar'
)
user2 = IndividualUser.IndividualUser(
    nickname='Mike', password='123', sex='male',
    name='Mike', birth='1996.02.01', residence_address='Nanjing University',
    education='bachelor', school='NJU', work_address='NJU',
    live_address='NJU', marriage='married', salary='3000',
    vehicle_property='300000', house_property='0', vehicle_loan='0', house_loan='0',
    work_year='3', job='whiteCollar'
)
db.session.add_all([user1, user2])
db.session.commit()

company1 = EnterpriseUser.EnterpriseUser("狼厂", "123", "19960901", 12, "Robin Li", 13, "0.11", "0.35", "北京市中关村", "www.baidu.com", "110", "陆奇来救我~")
company2 = EnterpriseUser.EnterpriseUser("阿里", "123", "19960901", 13, "Jack Ma", 13, "0.11", "0.35", "杭州某某", "www.alibaba.com", "120", "做福娃，修福报")
db.session.add_all([company1, company2])
db.session.commit()

loan_record1 = LoanRecord.LoanRecord(LoanMoney=10000, DebtorId=user1.Id, ProductId=loan1.Id, LenderId=company1.Id)
loan_record2 = LoanRecord.LoanRecord(LoanMoney=5000, DebtorId=user1.Id, ProductId=loan2.Id, LenderId=company2.Id)
loan_record3 = LoanRecord.LoanRecord(LoanMoney=20000, DebtorId=user2.Id, ProductId=loan2.Id, LenderId=company2.Id)
db.session.add_all([loan_record1, loan_record2, loan_record3])
db.session.commit()

loan_product_comments = [
    LoanProductComment.LoanProductComment(ProductId=1, UserId=1, Comment="balabala_1_1", Score=1),
    LoanProductComment.LoanProductComment(ProductId=2, UserId=1, Comment="balabala_1_2", Score=2),
    LoanProductComment.LoanProductComment(ProductId=3, UserId=1, Comment="balabala_1_3", Score=3),
    LoanProductComment.LoanProductComment(ProductId=1, UserId=2, Comment="balabala_2_1", Score=4),
    LoanProductComment.LoanProductComment(ProductId=2, UserId=2, Comment="balabala_2_2", Score=5),
    LoanProductComment.LoanProductComment(ProductId=3, UserId=2, Comment="balabala_2_3", Score=4),
]
db.session.add_all(loan_product_comments)
db.session.commit()