import base64

from Crypto.Cipher import AES
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired
# from sqlalchemy import Enum

from app import db, app

class Contract(db.Model):
    __tablename__ = "contract"

    Id = db.Column(db.Integer, primary_key=True)

    Text = db.Column(db.String(2000))
    Record = db.Column(db.String(2000))

    def to_dict(self):
        return {
            'text': self.Text,
            'record': self.Record,
        }


