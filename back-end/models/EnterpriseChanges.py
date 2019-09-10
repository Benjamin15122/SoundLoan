from app import db, app


class EnterpriseChanges(db.Model):
    __tablename__ = "enterprise_changes"

    Id = db.Column(db.Integer, primary_key=True)
    EnterpriseId = db.Column(db.Integer, db.foreignKey('user_enterprise.Id'))

    ChangeItem = db.Column(db.String(1000))
    CreateTime = db.Column(db.String(20))
    ContentBefore = db.Column(db.Text)
    ContentAfter = db.Column(db.Text)
    ChangeTime = db.Column(db.String(20))

    def __init__(self, EnterpriseId, ChangeItem, CreateTime, ContentBefore, ContentAfter, ChangeTime):
        self.EnterpriseId = EnterpriseId
        self.ChangeItem = ChangeItem
        self.CreateTime = CreateTime
        self.ContentBefore = ContentBefore
        self.ContentAfter = ContentAfter
        self.ChangeTime = ChangeTime

    def to_dict(self):
        return {
            'id': self.Id,
            'enterprise_id': self.EnterpriseId,
            'change_item': self.ChangeItem,
            'create_time':self.CreateTime,
            'change_time':self.ChangeTime,
            'content_before': self.ContentBefore,
            'content_after': self.ContentAfter
        }

