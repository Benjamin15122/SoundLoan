from app import db, app


class Contract(db.Model):
    __tablename__ = "contract"

    Id = db.Column(db.Integer, primary_key=True)

    # UserId = db.Column(db.Integer, db.ForeignKey('user_individual.Id'))
    IndividualName = db.Column(db.String(80), db.ForeignKey('user_individual.Nickname'))
    EnterpriseName = db.Column(db.String(80), db.ForeignKey('user_enterprise.Name'))
    Text = db.Column(db.String(2000))
    Record = db.Column(db.String(2000))

    # 合同的状态
    # SignState取值为'NoSign, Individual, Enterprise, BothSign, None'
    # 表示“没有签订，个人已签订，企业已签订，双方均已签订生效, 外部合同（仅用作检测）”
    SignState = db.Column(db.String(20))
    # AnalyzeState表示合同状态，取值为'Yes, No', 分别表示已分析和还没分析
    AnalyzeState = db.Column(db.String(20))

    # 用户的数字签名，如果合同是平台签订的话
    LenderSign = db.Column(db.String(2000))
    BorrowerSign = db.Column(db.String(2000))

    def to_dict(self):
        return {
            'id': self.Id,
            'individual_name': self.IndividualName,
            'enterprise_name': self.EnterpriseName,
            'sign_state': self.SignState,
            'analyze_state': self.AnalyzeState
        }

