from flask import jsonify, request
from app import app
from sqlalchemy import func, and_

from flask import Response, jsonify
from app import app, db
from models.IndividualUser import IndividualUser
from models.EnterpriseUser import EnterpriseUser
from models.LoanProduct import LoanProduct
from models.LoanRecord import LoanRecord
from models.Contract import Contract
from models.LoanProductComment import LoanProductComment
from models.LoanCommentComplain import LoanCommentComplain
from models.LoanRequiredMaterial import LoanRequiredMaterial


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


@app.route("/infoMan/createIndUserComplete", methods=["POST"])
@app.route("/infoMan/newCreateIndUser", methods=["POST"])
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

def str2Hump(text):
        arr = filter(None, text.lower().split('_'))
        res = ''
        for i in arr:
            res =  res + i[0].upper() + i[1:]
        return res

def changeUserInfo(user, arg_dict, exclude_dict):
    
    for a in arg_dict:
        if a in exclude_dict:
            continue
        arg_name = str2Hump(a)
        # If there is a field in the body that does not exist in IndividualUser, an Exception will be raised
        getattr(user, arg_name)
        setattr(user, arg_name, request.form[a])

    db.session.commit()

@app.route("/infoMan/changeIndUser", methods=["POST"])
def change_individual_user():
    user_id = request.form.get('id', None)
    user_name = request.form.get('nickname', None)
    if user_id is None and user_name is None:
        return jsonify({'success': False, 'message': 'Missing param id and nickname.'})

    if user_id is not None:
        user = IndividualUser.query.filter(IndividualUser.Id == user_id).first()
    else:
        user = IndividualUser.query.filter(IndividualUser.Name == user_name).first()
    if user is None:
        return jsonify({'success': False, 'message': 'Failed to find a qualified user.'})

    try:
        changeUserInfo(user, request.form, ['id', 'nickname'])
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

    return jsonify({'success': True})


@app.route("/infoMan/indLogin", methods=["POST"])
def login_individual_user():
    nickname = request.form.get('nickname', None)
    password = request.form.get('password', None)
    if not nickname or not password:
        return jsonify({'success': False, 'message': 'Missing params nickname or passwor.'})
    user = IndividualUser.query.filter(IndividualUser.Nickname == nickname).first()
    if not user:
        return jsonify({'success': False, 'message': 'User does not exist！'})
    if user.verify_password(password):
        return jsonify({
            'success': True,
            'content': {
                'id': user.Id,
                'nickname': user.Nickname,
                'token': user.gen_auth_token(),
            },
        })
    else:
        return jsonify({'success': False, 'message': 'Wrong password！'})
 

@app.route("/infoMan/indLoginPhone", methods=["POST"])
def login_individual_user_phone():
    phone_number = request.form.get('phone_number', None)
    if not phone_number:
        return jsonify({'success': False, 'message': 'Missing params phone_number.'})
    user = IndividualUser.query.filter(IndividualUser.PhoneNumber == phone_number).first()
    if not user:
        return jsonify({'success': False, 'message': 'User does not exist！'})
    return jsonify({
        'success': True,
        'content': {
            'id': user.Id,
            'nickname': user.Nickname,
            'token': user.gen_auth_token(),
        },
    })


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


@app.route("/infoMan/createLoanRecord", methods=["POST"])
def create_loan_record():
    try:
        params = request.form.to_dict()
        args = {}
        for a in params:
            args[str2Hump(a)] = params[a]
        new_record = LoanRecord(**args)

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


@app.route("/infoMan/createLoanProduct", methods=["POST"])
def create_loan_product():
    try:
        params = request.form.to_dict()
        args = {}
        for a in params:
            args[str2Hump(a)] = params[a]
        new_product = LoanProduct(**args)

        db.session.add(new_product)
        db.session.commit()

        return jsonify({
            'success': True,
            'content': {
                'id': new_product.Id
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})


@app.route("/infoMan/changeEntUser", methods=["POST"])
def change_enterprise_user():
    user_id = request.form.get('id', None)
    user_name = request.form.get('name', None)
    if user_id is None and user_name is None:
        return jsonify({'success': False, 'message': 'Missing param id and name.'})

    if user_id is not None:
        user = EnterpriseUser.query.filter(EnterpriseUser.Id == user_id).first()
    else:
        user = EnterpriseUser.query.filter(EnterpriseUser.Name == user_name).first()
    if user is None:
        return jsonify({'success': False, 'message': 'Failed to find a qualified user.'})

    try:
        changeUserInfo(user, request.form, ['id', 'name'])
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

    return jsonify({'success': True})


@app.route("/infoMan/changePW", methods=["POST"])
def change_password():
    user_name = request.form.get('user_name', None)
    user_type = request.form.get('user_type', None)
    origin_password = request.form.get('origin_password', None)
    new_password = request.form.get('new_password', None)
    if new_password is None or new_password is None or \
            origin_password is None or new_password is None:
        return jsonify({
            'success': False,
            'message': 'Missing param user_name/user_type/origin_password/new_password.'
        })
    
    if user_type == 'individual':
        user = IndividualUser.query.filter(IndividualUser.Nickname == user_name).first()
    elif user_type == 'enterprise':
        user = EnterpriseUser.query.filter(EnterpriseUser.Name == user_name).first()
    else:
        return jsonify({'success': False, 'message': 'Unrecognized user_type.'})
    
    if user is None:
        return jsonify({'success': False, 'message': 'Failed to find a qualified user.'})
    
    if not user.verify_password(origin_password):
        return jsonify({'success': False, 'message': 'Wrong origin_password.'})
    
    user.hash_password(new_password)
    db.session.commit()
    
    return jsonify({'success': True})

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
        return jsonify({
            'success': True,
            'content': {
                'id': user.Id,
                'name': user.Name,
                'token': user.gen_auth_token(),
            },
        })
    else:
        return jsonify({'success': False, 'message': 'Wrong password！'})


@app.route("/infoMan/allIndUsers", methods=["GET"])
def all_individual_users():
    users = IndividualUser.query.all()
    result = [u.to_dict() for u in users]
    return jsonify({'success': True, 'content': result})


@app.route("/infoMan/allEntUsers", methods=["GET"])
def all_enterprise_users():
    users = EnterpriseUser.query.all()
    result = [u.to_dict() for u in users]
    return jsonify({'success': True, 'content': result})


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
        'product_id': c.ProductId,
        'user_id': c.LoanProductComment.UserId,
        'comment': c.LoanProductComment.Comment,
        'score': c.LoanProductComment.Score,
    } for c in commentList]

    # 拿出每条评论的用户名
    for i in range(len(result)):
        ind = IndividualUser.query.get(result[i]['user_id'])
        result[i]['user_name'] = ind.Nickname

    return jsonify({'success': True, 'content': result})


def update_ent_score(ent_name):
    # update the credit score of an enterprise, should be called every time a user comment is added
    # entScore is the mean value of all the product scores from this enterprise
    try:
        sub = LoanProduct.query.filter(LoanProduct.EnterpriseName == ent_name).subquery()
        commentList = db.session.query(sub, LoanProductComment).join(LoanProductComment, LoanProductComment.ProductId == sub.c.Id).subquery()
        record = db.session.query(func.avg(commentList.c.Score).label("mean_score")).first()
        if record.mean_score is not None:
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


@app.route("/infoMan/entLoanApply", methods=["GET"])
def ent_loan_apply():
    name = request.args.get('company_name', None)
    
    user = EnterpriseUser.query.filter(EnterpriseUser.Name == name).first()
    if not user:
        return jsonify({'success': False, 'message': 'No such company found.'})
    userId = user.Id

    loans = LoanRecord.query.filter(LoanRecord.LenderId == userId).all()
    result = [l.to_dict() for l in loans]
    for i in range(len(result)):
        indUserId = result[i]['user_id']
        ind = IndividualUser.query.filter(IndividualUser.Id == indUserId).first()
        result[i]['ind_user_name'] = ind.Nickname

    return jsonify({'success': True, 'content': result})


@app.route("/infoMan/getMyApply", methods=["GET"])
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


@app.route("/infoMan/getMyCurrentLoan", methods=["GET"])
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


@app.route("/infoMan/getMyFinishedLoan", methods=["GET"])
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


@app.route("/infoMan/loanApplyReject", methods=['POST'])
def loan_apply_reject():
    try:
        recordId = request.form.get('record_id',  None)
        if not recordId:
            return jsonify({'success': False, 'message': 'Missing params record_id'})
        record = LoanRecord.query.filter(LoanRecord.Id == recordId).first()
        if not record:
            return jsonify({'success': False, 'message': 'No such loan record found'})
        db.session.delete(record)
        db.commit()
        return jsonify({'success': True, 'message': 'Loan apply rejected. '})
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


@app.route("/infoMan/searchEnt", methods=["GET"])
def search_enterprise():
    company_name = request.args.get('company_name', None)
    words = ['%{}%'.format(w) for w in company_name.split(' ')]
    rule = and_(*[EnterpriseUser.Name.like(w) for w in words])
    ents = EnterpriseUser.query.filter(rule).all()
    result = [e.to_dict() for e in ents]
    return jsonify({'success': True, 'content': result})


@app.route('/infoMan/addCommentComplain', methods=['POST'])
def add_comment_complain():
    try:
        ent_id = request.form.get('ent_id')
        product_id = request.form.get('comment_product_id')
        user_id = request.form.get('comment_user_id')
        complain = request.form.get('complain_content')
        new_complain = LoanCommentComplain(EnterpriseId=ent_id,
                                           ProductId=product_id,
                                           UserId=user_id,
                                           ComplainContent=complain)
        db.session.add(new_complain)
        db.commit()
        return jsonify({
            'success': True,
            'message': 'add complain successfully. '
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        })


@app.route('/infoMan/entAskMaterial', methods=['POST'])
def enterprise_ask_material():
    try:
        loan_record_id = request.form.get('loan_record_id')
        essential = request.form.get('essential')
        content = request.form.get('content')
        send_addr = request.form.get('send_addr')
        item = LoanRequiredMaterial(LoanRecordId=loan_record_id, Content=content,
                                    Essential=essential, SendAddr=send_addr)
        db.session.add(item)
        db.commit()
        return jsonify({
            'success': True,
            'message': 'add requirement successfully. '
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        })


@app.route('/infoMan/getAskMaterial', methods=['GET'])
def get_asked_materials():
    try:
        loan_record_id = request.args.get('loan_record_id')
        all_requirements = LoanRequiredMaterial.query.filter(LoanRequiredMaterial.LoanRecordId == loan_record_id).all()
        rtn = [each.to_dict() for each in all_requirements]
        return jsonify({
            'success': True,
            'message': '',
            'content': rtn
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })
