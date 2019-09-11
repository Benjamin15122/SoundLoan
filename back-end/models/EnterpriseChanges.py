from app import db, app


class EnterpriseChanges(db.Model):
    __tablename__ = "enterprise_changes"

    Id = db.Column(db.Integer, primary_key=True)
    enterpriseName = db.Column(db.String(100))

    changeItem = db.Column(db.String(1000))
    createTime = db.Column(db.String(20))
    contentBefore = db.Column(db.Text)
    contentAfter = db.Column(db.Text)
    changeTime = db.Column(db.String(20))

    def __init__(self, enterpriseName, changeItem, createTime, contentBefore, contentAfter, changeTime):
        self.enterpriseName = enterpriseName
        self.changeItem = changeItem
        self.createTime = createTime
        self.contentBefore = contentBefore
        self.contentAfter = contentAfter
        self.changeTime = changeTime

    def to_dict(self):
        return {
            'id': self.Id,
            'enterprise_name': self.enterpriseName,
            'change_item': self.changeItem,
            'create_time':self.createTime,
            'change_time':self.changeTime,
            'content_before': self.contentBefore,
            'content_after': self.contentAfter
        }

