import base64

from Crypto.Cipher import AES
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired
# from sqlalchemy import Enum

from app import db, app
from utils.common_utils import extend_to_16

class EnterpriseUser(db.Model):
    __tablename__ = "user_enterprise"
    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(80), index=True, nullable=False, unique=True)
    PasswordHash = db.Column(db.String(255), nullable=False)

    FoundationDate = db.Column(db.TIMESTAMP)
    CorporateCapital = db.Column(db.BIGINT)
    LegalPpersonName = db.Column(db.String(80))
    RegisterCapital = db.Column(db.BIGINT)
    LoanRateMin = db.Column(db.Float)
    LoanRateMax = db.Column(db.Float)
    Address = db.Column(db.String(256))
    Website = db.Column(db.String(256))
    Contact = db.Column(db.String(256))
    Description = db.Column(db.String(1000))

    CreditScore = db.Column(db.Float)
    
    aes = AES.new(extend_to_16(app.config['SECRET_KEY']), AES.MODE_ECB)


    def __init__(self, name, password,
                    foundation_date, corporate_capital, legal_person_name, register_capital,
                    loan_rate_min, loan_rate_max,
                    address, website, contact, description):
        self.Name = name
        self.hash_password(password)

        self.FoundationDate = foundation_date
        self.CorporateCapital = corporate_capital
        self.LegalPpersonName = legal_person_name
        self.RegisterCapital = register_capital
        self.LoanRateMin = loan_rate_min
        self.LoanRateMax = loan_rate_max
        self.Address = address
        self.Website = website
        self.Contact = contact
        self.Description = description

        # '-1' as 'not set'
        self.CreditScore = -1

    def to_dict(self):
        return {
            'id': self.Id,
            'name': self.Name,

            'foundation_date': self.FoundationDate.strftime('%Y-%m-%d'),
            'corporate_capital': self.CorporateCapital,
            'legal_person_name': self.LegalPpersonName,
            'register_capital': self.RegisterCapital,
            'loan_rate_min': self.LoanRateMin,
            'loan_rate_max': self.LoanRateMax,
            'address': self.Address,
            'website': self.Website,
            'contact': self.Contact,
            'description': self.Description,

            'credit_score': self.CreditScore
        }

    def get_name(self):
        return self.name

    def get_password_hash(self):
        return self.PasswordHash

    def hash_password(self, password):
        encrypt_aes = self.aes.encrypt(extend_to_16(password))
        self.PasswordHash = str(base64.encodebytes(encrypt_aes), encoding='utf-8').rstrip('\n')

    def get_decoded_password(self):
        encoded_str = base64.decodestring(self.PasswordHash.encode(encoding='utf-8'))
        decoded_password = self.aes.decrypt(encoded_str).decode().rstrip('\0')
        return decoded_password

    def verify_password(self, password):
        encrypt_aes = self.aes.encrypt(extend_to_16(password))
        password_hash = str(base64.encodebytes(encrypt_aes), encoding='utf-8').rstrip('\n')
        return password_hash == self.PasswordHash

    def gen_auth_token(self):
        s = Serializer(app.config['SECRET_KEY'], expires_in=app.config['EXPIRES_IN'])
        return str(s.dumps({'UserId': self.Id}), encoding='utf-8')

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        origin_token = bytes(token, encoding='utf-8')
        try:
            data = s.loads(origin_token)
        except SignatureExpired:
            return None # valid token, but expire
        except BadSignature:
            return None # invalid token
        user = EnterpriseUser.query.get(data['UserId'])
        return user

