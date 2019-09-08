from flask import jsonify, request
from sqlalchemy import func, and_

from flask import Response, jsonify
from app import app, db
from models.IndividualUser import IndividualUser
from models.EnterpriseUser import EnterpriseUser
from models.LoanProduct import LoanProduct
from models.LoanRecord import LoanRecord
from models.Contract import Contract
from models.LoanProductComment import LoanProductComment


@app.route("/infoMan/indUserInfo", methods=["GET"])
def query_individual_user():
    user_id = request.args.get('id', None)
    user_nickname = request.args.get('nickname', None)
    if user_id is None and user_nickname is None:
        return jsonify({'success': False, 'message': 'Missing param id and nickname.'})

    if user_id is not None:
        user = IndividualUser.query.filter(IndividualUser.Id == user_id).first()
    else:
        user = IndividualUser.query.filter(IndividualUser.Nickname == user_nickname).first()
    if user is None:
        return jsonify({'success': False, 'message': 'Failed to find a qualified user.'})
    
    return jsonify({'success': True, 'content': user.to_dict()})


@app.route("/infoMan/createIndUser", methods=["POST"])
def create_individual_user():
    try:
        params = request.form.to_dict()

        new_user = IndividualUser(**params)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            'success': True,
            'content': {
                'id': new_user.Id
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route("/infoMan/indLogin", methods=["POST"])
def login_individual_user():
    nickname = request.form.get('nickname', None)
    password = request.form.get('password', None)
    if not nickname or not password:
        return jsonify({'success': False, 'message': 'Missing params nickname or password！'})
    user = IndividualUser.query.filter(IndividualUser.Nickname == nickname).first()
    if not user:
        return jsonify({'success': False, 'message': 'User does not exist！'})
    if user.verify_password(password):
        return jsonify({'success': True, 'token': user.gen_auth_token()})
    else:
        return jsonify({'success': False, 'message': 'Wrong password！'})


@app.route("/infoMan/entUserInfo", methods=["GET"])
def query_enterprise_user():
    user_id = request.args.get('id', None)
    user_name = request.args.get('name', None)
    if user_id is None and user_name is None:
        return jsonify({'success': False, 'message': 'Missing param id and name.'})

    if user_id is not None:
        user = EnterpriseUser.query.filter(EnterpriseUser.Id == user_id).first()
    else:
        user = EnterpriseUser.query.filter(EnterpriseUser.Name == user_name).first()
    if user is None:
        return jsonify({'success': False, 'message': 'Failed to find a qualified user.'})
    
    return jsonify({'success': True, 'content': user.to_dict()})


@app.route("/infoMan/createEntUser", methods=["POST"])
def create_enterprise_user():
    try:
        params = request.form.to_dict()

        new_user = EnterpriseUser(**params)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            'success': True,
            'content': {
                'id': new_user.Id
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})


@app.route("/infoMan/entLogin", methods=["POST"])
def login_enterprise_user():
    name = request.form.get('name', None)
    password = request.form.get('password', None)
    if not name or not password:
        return jsonify({'success': False, 'message': 'Missing params name or password！'})
    user = EnterpriseUser.query.filter(EnterpriseUser.Name == name).first()
    if not user:
        return jsonify({'success': False, 'message': 'User does not exist！'})
    if user.verify_password(password):
        return jsonify({'success': True, 'token': user.gen_auth_token()})
    else:
        return jsonify({'success': False, 'message': 'Wrong password！'})


@app.route("/infoMan/allLoanProductComment", methods=["GET"])
def all_loan_product_comment():
    comments = LoanProductComment.query.all()
    result = [c.to_dict() for c in comments]
    return jsonify({'success': True, 'content': result})


@app.route("/infoMan/entProductComment", methods=["GET"])
def ent_product_comment():
    name = request.args.get('company_name', None)
    if not name:
        return jsonify({'success': False, 'message': 'Missing params company_name'})
    sub = LoanProduct.query.filter(LoanProduct.EnterpriseName == name).subquery()
    commentList = db.session.query(sub, LoanProductComment).join(LoanProductComment, LoanProductComment.ProductId == sub.c.Id).all()
    result = [{
        'product_name': c.Name,
        'user_id': c.LoanProductComment.UserId,
        'comment': c.LoanProductComment.Comment,
        'score': c.LoanProductComment.Score,
    } for c in commentList]

    return jsonify({'success': True, 'content': result})


def update_ent_score(ent_name):
    # update the credit score of an enterprise, should be called every time a user comment is added
    # entScore is the mean value of all the product scores from this enterprise
    try:
        sub = LoanProduct.query.filter(LoanProduct.EnterpriseName == ent_name).subquery()
        commentList = db.session.query(sub, LoanProductComment).join(LoanProductComment, LoanProductComment.ProductId == sub.c.Id).subquery()
        record = db.session.query(func.avg(commentList.c.Score).label("mean_score")).first()
        new_score = float(str(record.mean_score))
        ent_user = EnterpriseUser.query.filter(EnterpriseUser.Name==ent_name).first()
        ent_user.CreditScore = new_score
        
        db.session.commit()
    except Exception as e:
        raise e 

@app.route("/infoMan/addProductComment", methods=["POST"])
def add_product_comment():
    company_name = request.form.get('company_name', None)
    product_name = request.form.get('product_name', None)
    user_name = request.form.get('user_name', None)
    comment = request.form.get('comment', None)
    score = request.form.get('score', None)
    if not company_name or not product_name or not user_name or not comment or not score:
        return jsonify({'success': False, 'message': 'Missing params company_name/product_name/user_name/comment/score.'})
    
    # prepare a new comment record
    product = LoanProduct.query.filter(LoanProduct.Name == product_name).first()
    if not product:
        return jsonify({'success': False, 'message': 'No such loan product found.'})
    product_id = product.Id

    user = IndividualUser.query.filter(IndividualUser.Nickname == user_name).first()
    if not user:
        return jsonify({'success': False, 'message': 'No such individual user found.'})
    user_id = user.Id

    new_comment = LoanProductComment(ProductId=product_id, UserId=user_id, Comment=comment, Score=score)

    # add and update record in database 
    try:
        db.session.add(new_comment)
        db.session.commit()

        update_ent_score(company_name)

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

    return jsonify({'success': True})


@app.route("/infoMan/entScore", methods=["GET"])
def ent_score():
    '''
    Diplicated, use CreditScore of EnterpriseUser instead
    '''
    # entScore is the mean value of all the product scores from this enterprise
    name = request.args.get('company_name', None)
    if not name:
        return jsonify({'success': False, 'message': 'Missing params company_name'})
    sub = LoanProduct.query.filter(LoanProduct.EnterpriseName == name).subquery()
    commentList = db.session.query(sub, LoanProductComment).join(LoanProductComment, LoanProductComment.ProductId == sub.c.Id).subquery()
    score = db.session.query(func.avg(commentList.c.Score).label("mean_score")).first()
    result = {'score': float(str(score.mean_score))}
    return jsonify({'success': True, 'content': result})
    

@app.route("/infoMan/allLoan", methods=["GET"])
def all_loan():
    loan_records = LoanRecord.query.all()
    result = [r.to_dict() for r in loan_records]
    return jsonify({'success': True, 'content': result})


@app.route("/infoMan/userAppliedLoan", methods=["GET"])
def user_applied_loan():
    user_name = request.args.get('user_name', None)
    if not user_name:
        return jsonify({'success': False, 'message': 'Missing params user_name'})
    user = IndividualUser.query.filter(IndividualUser.Nickname == user_name).first()
    if not user:
        return jsonify({'success': False, 'message': 'No such user found'})
    userId = user.Id
    loan_records = LoanRecord.query.filter(
        and_(
            LoanRecord.DebtorId == userId,
            LoanRecord.OrderStatus.in_(['applied', 'auditing', 'uploading_contract'])
        )
    ).all()
    result = [r.to_dict() for r in loan_records]
    return jsonify({'success': True, 'content': result})


@app.route("/infoMan/effectiveLoan", methods=["GET"])
def effective_loan():
    user_name = request.args.get('user_name', None)
    if not user_name:
        return jsonify({'success': False, 'message': 'Missing params user_name'})
    user = IndividualUser.query.filter(IndividualUser.Nickname == user_name).first()
    if not user:
        return jsonify({'success': False, 'message': 'No such user found'})
    userId = user.Id
    loan_records = LoanRecord.query.filter(
        and_(
            LoanRecord.DebtorId == userId,
            LoanRecord.OrderStatus.in_(['effective'])
        )
    ).all()
    result = [r.to_dict() for r in loan_records]
    return jsonify({'success': True, 'content': result})


@app.route("/infoMan/finishedLoan", methods=["GET"])
def finished_loan():
    user_name = request.args.get('user_name', None)
    if not user_name:
        return jsonify({'success': False, 'message': 'Missing params user_name'})
    user = IndividualUser.query.filter(IndividualUser.Nickname == user_name).first()
    if not user:
        return jsonify({'success': False, 'message': 'No such user found'})
    userId = user.Id
    loan_records = LoanRecord.query.filter(
        and_(
            LoanRecord.DebtorId == userId,
            LoanRecord.OrderStatus.in_(['finished'])
        )
    ).all()
    result = [r.to_dict() for r in loan_records]
    return jsonify({'success': True, 'content': result})


@app.route("/infoMan/loanApply", methods=["POST"])
def loan_apply():
    try:
        params = request.form.to_dict()

        new_record = LoanRecord(**params)

        db.session.add(new_record)
        db.session.commit()

        return jsonify({
            'success': True,
            'content': {
                'id': new_record.Id
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})


@app.route("/infoMan/loanApplyPass", methods=["POST"])
def loan_apply_pass():
    recordId = request.form.get('record_id', None)
    if not recordId:
        return jsonify({'success': False, 'message': 'Missing params record_id'})
    record = LoanRecord.query.filter(LoanRecord.Id == recordId).first()
    if not record:
        return jsonify({'success': False, 'message': 'No such loan record found'})

    record.OrderStatus = 'uploading_contract'
    db.session.commit()
    
    return jsonify({'success': True})