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
from app.contract_analyze import routes
from models import IndividualUser, EnterpriseUser, LoanProduct, LoanRecord, Contract

#db.create_all()

db.drop_all()
db.create_all()

loan1 = LoanProduct.LoanProduct(Name=u'金利来小额贷', AmountMin=1000, AmountMax=30000, RateMin=0.12, RateMax=0.23, DurationMin=6, DurationMax=24)
loan2 = LoanProduct.LoanProduct(Name=u'生活无忧小额贷', AmountMin=3000, AmountMax=20000, RateMin=0.13, RateMax=0.33, DurationMin=3, DurationMax=36)
loan3 = LoanProduct.LoanProduct(Name=u'要你命3000贷', AmountMin=3000, AmountMax=300000, RateMin=0.24, RateMax=0.36, DurationMin=1, DurationMax=12)

db.session.add_all([loan1, loan2, loan3])
db.session.commit()
