from app import db, app


class LoanCommentComplain(db.Model):
    __tablename__ = "loan_comment_complain"

    Id = db.Column(db.Integer, primary_key=True)
    EnterpriseId = db.Column(db.Integer)
    ProductId = db.Column(db.Integer)
    UserId = db.Column(db.Integer)
    ComplainContent = db.Column(db.String(1000))

    def to_dict(self):
        return {
            'id': self.Id,
            'enterprise_id': self.EnterpriseId,
            'product_id': self.ProductId,
            'user_id': self.UserId,
            'complain_content': self.ComplainContent
        }
