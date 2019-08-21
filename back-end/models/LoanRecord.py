import base64

from Crypto.Cipher import AES
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired
# from sqlalchemy import Enum

from app import db, app


class LoanRecord(db.Model):
    __tablename__ = "loan_record"

    Id = db.Column(db.Integer, primary_key=True)

    LoanMoney = db.Column(db.Integer)
    Rate = db.Column(db.Float)
    LenderId = db.Column(db.Integer, db.ForeignKey('user_enterprise.Id'))

    DebtorId = db.Column(db.Integer, db.ForeignKey('user_individual.Id'))
    ProductId = db.Column(db.Integer, db.ForeignKey('loan_product.Id'))

    AppDate = db.Column(db.TIMESTAMP)
    DueDate = db.Column(db.TIMESTAMP)
    StartDate = db.Column(db.TIMESTAMP)
    EndDate = db.Column(db.TIMESTAMP)
    RepayStatus = db.Column(db.Enum('overdue ', 'ongoing', 'done'))
    ContractId = db.Column(db.Integer, db.ForeignKey('contract.Id'))

    def to_dict(self):
        return {
            'lender_id': self.LenderId,
            'debtor_id': self.DebtorId,
            'product_id': self.ProductId,
            'LoanMoney': self.LoanMoney,
            'rate': self.Rate,
            'app_date': self.AppDate.strftime('%Y-%m-%d'),
            'repay_date': self.RepayDate.strftime('%Y-%m-%d')
        }

