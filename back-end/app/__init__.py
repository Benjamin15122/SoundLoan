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
from models import IndividualUser, EnterpriseUser, LoanProduct, LoanRecord, Contract

db.create_all()
