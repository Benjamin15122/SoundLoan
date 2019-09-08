from app import db, app


class ContractOrderFee(db.Model):
    __tablename__ = "contract_order_fee"

    Id = db.Column(db.Integer, primary_key=True)

    OrderId = db.Column(db.Integer, unique=True)
    # 付款后为1，否则为0
    Paid = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.Id,
            'order_id': self.OrderId,
            'paid': True if self.Paid == 1 else False
        }

