from app import db, app


class LoanRequiredMaterial(db.Model):
    __tablename__ = "loan_required_material"

    Id = db.Column(db.Integer, primary_key=True)
    LoanRecordId = db.Column(db.Integer, db.ForeignKey('loan_record.Id'))
    Content = db.Column(db.Integer)
    Essential = db.Column(db.Boolean)
    SendAddr = db.Column(db.String(30))

    def to_dict(self):
        return {
            'id': self.Id,
            'loan_record_id': self.LoanRecordId,
            'content': self.Content,
            'essential': self.Essential,
            'send_addr': self.SendAddr
        }
