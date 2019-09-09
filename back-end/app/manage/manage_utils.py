import time

from sqlalchemy import func, and_

from app import app, db
from models.IndividualUser import IndividualUser
from models.LoanRecord import LoanRecord

def update_ind_user_credit_all():
    for u in IndividualUser.query.all():
        update_ind_user_credit(u.Id)


def update_ind_user_credit(user_id):
    # user_loan = db.session.query(IndividualUser, LoanRecord).join(IndividualUser.Id == LoanRecord.DebtorId).subquery()
    # record = db.session.query(func.count(commentList.c.Score).label("mean_score")).first()

    arg_dict = {}
    user_loan = db.session.query(LoanRecord).filter(LoanRecord.DebtorId==user_id).subquery()

    OverdueTime = db.session.query(func.count(user_loan.c.Id).label("count")).filter(
        user_loan.c.RepayStatus=='overdue'
    ).first().count
    arg_dict['OverdueTime'] = 0 if OverdueTime is None else int(str(OverdueTime))

    PayTime = db.session.query(func.count(user_loan.c.Id).label("count")).filter(
        user_loan.c.RepayStatus=='done'
    ).first().count
    arg_dict['PayTime'] = 0 if PayTime is None else int(str(PayTime))

    ApplyPassTime = db.session.query(func.count(user_loan.c.Id).label("count")).filter(
        user_loan.c.OrderStatus.in_(['uploading_contract', 'effective', 'finished'])
    ).first().count
    arg_dict['ApplyPassTime'] = 0 if ApplyPassTime is None else int(str(ApplyPassTime))

    UnrepayCapitalAmount = db.session.query(func.sum(user_loan.c.LoanMoney).label("sum")).filter(
        user_loan.c.RepayStatus.in_(['overdue', 'ongoing'])
    ).first().sum
    arg_dict['UnrepayCapitalAmount'] = 0 if UnrepayCapitalAmount is None else int(str(UnrepayCapitalAmount))

    RepayCapitalAmount = db.session.query(func.sum(user_loan.c.LoanMoney).label("sum")).filter(
        user_loan.c.RepayStatus.in_(['done'])
    ).first().sum
    arg_dict['RepayCapitalAmount'] = 0 if RepayCapitalAmount is None else int(str(RepayCapitalAmount))

    UnrepayInterestAmount = db.session.query(
        func.sum(user_loan.c.LoanMoney * user_loan.c.Rate * (time.time()-user_loan.c.StartDateTimestamp)/(3600*24*365)).label("sum")
    ).filter(
        user_loan.c.RepayStatus.in_(['overdue', 'ongoing'])
    ).first().sum
    arg_dict['UnrepayInterestAmount'] = 0 if UnrepayInterestAmount is None else int(float(str(UnrepayInterestAmount)))

    RepayInterestAmount = db.session.query(
        func.sum(user_loan.c.LoanMoney * user_loan.c.Rate * (time.time()-user_loan.c.StartDateTimestamp)/(3600*24*365)).label("sum")
    ).filter(
        user_loan.c.RepayStatus.in_(['done'])
    ).first().sum
    arg_dict['RepayInterestAmount'] = 0 if RepayInterestAmount is None else int(float(str(RepayInterestAmount)))

    OverdueCapitalAmount = db.session.query(func.sum(user_loan.c.LoanMoney).label("sum")).filter(
        user_loan.c.RepayStatus.in_(['overdue'])
    ).first().sum
    arg_dict['OverdueCapitalAmount'] = 0 if OverdueCapitalAmount is None else int(str(OverdueCapitalAmount))

    OverdueInterestAmount = db.session.query(
        func.sum(user_loan.c.LoanMoney * user_loan.c.Rate * (time.time()-user_loan.c.StartDateTimestamp)/(3600*24*365)).label("sum")
    ).filter(
        user_loan.c.RepayStatus.in_(['overdue'])
    ).first().sum
    arg_dict['OverdueInterestAmount'] = 0 if OverdueInterestAmount is None else int(float(str(OverdueInterestAmount)))

    user = IndividualUser.query.filter(IndividualUser.Id == user_id).first()
    for a in arg_dict:
        setattr(user, a, arg_dict[a])
    db.session.commit()


    