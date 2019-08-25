from app import db, app


class LoanProductComment(db.Model):
    __tablename__ = "loan_product_comment"

    ProductId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, primary_key=True)
    Comment = db.Column(db.String(1000))


    def to_dict(self):
        return {
            'product_id': self.ProductId,
            'user_id': self.UserId,
            'comment': self.Comment,
        }
