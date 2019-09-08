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
from app.authentication import routes
from app.contract_assignment import routes
from models import IndividualUser, EnterpriseUser, LoanProduct, LoanRecord, Contract, LoanProductComment

#db.create_all()

# 以下数据供测试用，可以添加更多数据
db.drop_all()
db.create_all()

# 目前暂定每个公司只有一个贷款产品，贷款产品的名称与公司名称一致
loan1 = LoanProduct.LoanProduct(Name=u'狼厂', EnterpriseName="狼厂", AmountMin=1000, AmountMax=30000, RateMin=0.12, RateMax=0.23, DurationMin=6, DurationMax=24)
loan2 = LoanProduct.LoanProduct(Name=u'阿里', EnterpriseName="阿里", AmountMin=3000, AmountMax=20000, RateMin=0.13, RateMax=0.33, DurationMin=3, DurationMax=36)
loan3 = LoanProduct.LoanProduct(Name=u'Dio面包坊', EnterpriseName="Dio面包坊", AmountMin=3000, AmountMax=300000, RateMin=0.24, RateMax=0.36, DurationMin=1, DurationMax=12)
db.session.add_all([loan1, loan2, loan3])
db.session.commit()

user1 = IndividualUser.IndividualUser(
    nickname='Lucy', password='123', sex='female',
    name='Lucy', birth='1996.01.01', residence_address='Nanjing University',
    education='bachelor', school='NJU', work_address='NJU',
    live_address='NJU', marriage='married', salary='3000',
    vehicle_property='300000', house_property='0', vehicle_loan='0', house_loan='0',
    work_year='3', job='whiteCollar', phone_number='11111111111'
)
user2 = IndividualUser.IndividualUser(
    nickname='Mike', password='123', sex='male',
    name='Mike', birth='1996.02.01', residence_address='Nanjing University',
    education='bachelor', school='NJU', work_address='NJU',
    live_address='NJU', marriage='married', salary='3000',
    vehicle_property='300000', house_property='0', vehicle_loan='0', house_loan='0',
    work_year='3', job='whiteCollar', phone_number='11111111112'
)
user3 = IndividualUser.IndividualUser(
    nickname='grignard', password='1211', sex='male',
    name='mx', birth='1996.02.01', residence_address='Nanjing University',
    education='bachelor', school='NJU', work_address='NJU',
    live_address='NJU', marriage='married', salary='3000',
    vehicle_property='300000', house_property='0', vehicle_loan='0', house_loan='0',
    work_year='3', job='whiteCollar'
)
db.session.add_all([user1, user2])
db.session.commit()

company1 = EnterpriseUser.EnterpriseUser("狼厂", "123", "19960901", 12, "Robin Li", 13, "0.09", "0.35", "北京市中关村", "www.baidu.com", "110", "彦宏好帅好帅的")
company2 = EnterpriseUser.EnterpriseUser("阿里", "123", "19960901", 13, "Jack Ma", 13, "0.14", "0.35", "杭州某某", "www.alibaba.com", "120", "做福娃，修福报")
company3 = EnterpriseUser.EnterpriseUser("Dio面包坊", "123", "19960901", 13, "Dio Brando", 13, "0.10", "0.35", "埃及", "www.ningenoyameruzo.com", "120", "你记得自己吃过多少片面包吗")
companies = [company1, company2, company3]
db.session.add_all(companies)
db.session.commit()


loan_product_comments = [
    LoanProductComment.LoanProductComment(ProductId=1, UserId=1, Comment="balabala_1_1", Score=1),
    LoanProductComment.LoanProductComment(ProductId=2, UserId=1, Comment="balabala_1_2", Score=2),
    LoanProductComment.LoanProductComment(ProductId=3, UserId=1, Comment="balabala_1_3", Score=3),
    LoanProductComment.LoanProductComment(ProductId=1, UserId=2, Comment="balabala_2_1", Score=4),
    LoanProductComment.LoanProductComment(ProductId=2, UserId=2, Comment="balabala_2_2", Score=5),
    # LoanProductComment.LoanProductComment(ProductId=3, UserId=2, Comment="balabala_2_3", Score=4),
]
db.session.add_all(loan_product_comments)
db.session.commit()

# 增加用户评论后，要更新企业的评分
from app.manage.routes import update_ent_score
for c in companies:
    update_ent_score(c.Name)

loan_records = [
    LoanRecord.LoanRecord(
        LoanMoney=100000, Rate=0.4, LenderId=company1.Id, DebtorId=user1.Id, ProductId=loan1.Id,
        AppDateTimestamp=1, DueDateTimestamp=1, StartDateTimestamp=1, EndDateTimestamp=1,
        RepayStatus='ongoing', OrderStatus='applied', ContractId=None
    ),
    LoanRecord.LoanRecord(
        LoanMoney=100000, Rate=0.14, LenderId=company3.Id, DebtorId=user1.Id, ProductId=loan3.Id,
        AppDateTimestamp=1, DueDateTimestamp=1, StartDateTimestamp=1, EndDateTimestamp=1,
        RepayStatus='ongoing', OrderStatus='uploading_contract', ContractId=None
    ),
    LoanRecord.LoanRecord(
        LoanMoney=100000, Rate=0.14, LenderId=company1.Id, DebtorId=user2.Id, ProductId=loan1.Id,
        AppDateTimestamp=1, DueDateTimestamp=1, StartDateTimestamp=1, EndDateTimestamp=1,
        RepayStatus='ongoing', OrderStatus='effective', ContractId=None
    ),
    LoanRecord.LoanRecord(
        LoanMoney=100000, Rate=0.4, LenderId=company3.Id, DebtorId=user2.Id, ProductId=loan3.Id,
        AppDateTimestamp=1, DueDateTimestamp=1, StartDateTimestamp=1, EndDateTimestamp=1,
        RepayStatus='ongoing', OrderStatus='finished', ContractId=None
    ),
]
db.session.add_all(loan_records)
db.session.commit()

contract1 = Contract.Contract(
    LoanRecordId=loan_records[1].Id,
    IndividualName=user1.Nickname,
    EnterpriseName=company3.Name,
    Title='测试借款合同',
    Text='借款人：%s\n放贷者：%s\n借款金额：100000\n借款利息：0.14\n' % (user1.Nickname, company3.Name),
    SignState='NoSign',
    AnalyzeState='No'
)
db.session.add(contract1)
db.session.commit()
