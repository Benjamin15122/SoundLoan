from app import db, app

class Contract(db.Model):
    __tablename__ = "contract"

    Id = db.Column(db.Integer, primary_key=True)

    UserId = db.Column(db.Integer, db.ForeignKey('user_individual.Id'))
    Text = db.Column(db.String(2000))
    Record = db.Column(db.String(2000))

    def to_dict(self):
        return {
            'id': self.Id,
            'user_id': self.UserId,
            'text': self.Text,
            'record': self.Record,
        }

