from app import db, app


class Contract(db.Model):
    __tablename__ = "contract"

    Id = db.Column(db.Integer, primary_key=True)

    # 这里不能有外键约束否则会报循环外键约束的错误
    LoanRecordId = db.Column(db.Integer)

    # UserId = db.Column(db.Integer, db.ForeignKey('user_individual.Id'))
    IndividualName = db.Column(db.String(80), db.ForeignKey('user_individual.Nickname'))
    EnterpriseName = db.Column(db.String(80), db.ForeignKey('user_enterprise.Name'))
    Title = db.Column(db.String(100))
    Text = db.Column(db.Text)
    Record = db.Column(db.Text)

    # 合同的状态
    # SignState取值为'NoSign, Individual, Enterprise, BothSign, None'
    # 表示“没有签订，个人已签订，企业已签订，双方均已签订生效, 外部合同（仅用作检测）”
    SignState = db.Column(db.Enum('NoSign', 'Individual', 'Enterprise', 'BothSign', 'None'))
    # AnalyzeState表示合同状态，取值为'Yes, No', 分别表示已分析和还没分析
    AnalyzeState = db.Column(db.Enum('Yes', 'No'))

    # 用户的数字签名，如果合同是平台签订的话
    IndividualSign = db.Column(db.String(2000))
    EnterpriseSign = db.Column(db.String(2000))

    def to_dict(self):
        return {
            'id': self.Id,
            'loan_record_id': self.LoanRecordId,
            'title': self.Title,
            'individual_name': self.IndividualName,
            'enterprise_name': self.EnterpriseName,
            'sign_state': self.SignState,
            'analyze_state': self.AnalyzeState
        }

