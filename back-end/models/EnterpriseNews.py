import base64

from Crypto.Cipher import AES
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired
# from sqlalchemy import Enum

from app import db, app


class EnterpriseNews(db.Model):
    __tablename__ = 'enterprise_news'

    Id = db.Column(db.Integer, primary_key=True)

    EnterpriseName = db.Column(db.String(80))
    NewsTitle = db.Column(db.String(256), nullable=False)
    NewsLink = db.Column(db.String(256))
    DistributionDate = db.Column(db.TIMESTAMP)

    def __init__(self, enterprise_name, news_title, news_link, distribution_date):
        self.EnterpriseName = enterprise_name
        self.NewsTitle = news_title
        self.NewsLink = news_link
        self.DistributionDate = distribution_date


    def to_dict(self):
        return {
            'enterprise_name': self.EnterpriseName,
            'news_title': self.NewsTitle,
            'news_link': self.NewsLink,
            'distribution_date': self.DistributionDate
        }