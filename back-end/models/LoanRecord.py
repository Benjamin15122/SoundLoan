from app import db, app


class LoanRecord(db.Model):
    __tablename__ = "loan_record"

    Id = db.Column(db.Integer, primary_key=True)

    LoanMoney = db.Column(db.Integer)
    Rate = db.Column(db.Float)
    LenderId = db.Column(db.Integer, db.ForeignKey('user_enterprise.Id'))

    DebtorId = db.Column(db.Integer, db.ForeignKey('user_individual.Id'))
    ProductId = db.Column(db.Integer, db.ForeignKey('loan_product.Id'))

    AppDateTimestamp = db.Column(db.BIGINT)
    DueDateTimestamp = db.Column(db.BIGINT)
    StartDateTimestamp = db.Column(db.BIGINT)
    EndDateTimestamp = db.Column(db.BIGINT)

    RepayStatus = db.Column(db.Enum('overdue', 'ongoing', 'done'))
    OrderStatus = db.Column(db.Enum('applied', 'auditing', 'uploading_contract', 'effective', 'finished'))
    ContractId = db.Column(db.Integer, db.ForeignKey('contract.Id'))

    def to_dict(self):
        return {
            'id': self.Id,
            'lender_id': self.LenderId,
            'debtor_id': self.DebtorId,
            'product_id': self.ProductId,
            'contract_id': self.ContractId,
            'loan_money': self.LoanMoney,
            'rate': self.Rate,
            'app_date_timestamp': self.AppDateTimestamp,
            'due_date_timestamp': self.DueDateTimestamp,
            'start_date_timestamp': self.StartDateTimestamp,
            'end_date_timestamp': self.EndDateTimestamp,
            'repay_status': self.RepayStatus,
            'order_status': self.OrderStatus,
        }

