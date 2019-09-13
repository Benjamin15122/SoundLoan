from flask import jsonify, request, send_from_directory
from app import app, db
from models.Contract import Contract
from models.LoanRecord import LoanRecord
from models.IndividualUser import IndividualUser
from models.EnterpriseUser import EnterpriseUser
from config import Config
from utils.contract_assignment_utils import *
from utils.contract_analyze_utils import *


@app.route("/contract/getAll", methods=["POST"])
def get_user_contracts():
    try:
        user_name = request.form.get('user_name')
        user_type = request.form.get('user_type')
        if user_type == 'individual':
            contracts_item = Contract.query.filter(Contract.IndividualName == user_name).all()
        else:
            contracts_item = Contract.query.filter(Contract.EnterpriseName == user_name).all()
        contracts = [each.to_dict() for each in contracts_item]
        return jsonify({
            'success': True,
            'message': '',
            'content': contracts
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/contract/getAnalyze', methods=['GET'])
def get_contract_analysis():
    try:
        contract_id = int(request.args.get('contract_id'))
        contract = Contract.query.get(contract_id)
        if contract.AnalyzeState is None or contract.AnalyzeState == 'No':
            return jsonify({
                'success': False,
                'message': 'This contract haven\'t been analyzed yet. ',
                'content': None
            })
        else:
            return jsonify({
                'success': True,
                'message': '',
                'content': [contract.Title, contract.Record]
            })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/contract/getContent', methods=['GET'])
def get_contract_content():
    try:
        contract_id = int(request.args.get('contract_id'))
        contract = Contract.query.get(contract_id)
        if contract is None:
            return jsonify({
                'success': False,
                'message': "数据库中找不到对应id的合同文本",
                'content': None
            })
        return jsonify({
            'success': True,
            'message': '',
            'content': [contract.Title, contract.Text]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/contract/uploadImage', methods=['POST'])
def upload_contract_image():
    try:
        individual_name = request.form.get('individual_name')
        enterprise_name = request.form.get('enterprise_name')
        contract_content = request.form.get('contract_content')
        title = request.form.get('contract_title')
        text = image_to_text([contract_content])
        contract = Contract(
            IndividualName=individual_name,
            EnterpriseName=enterprise_name,
            Text=text,
            SignState='NoSign',
            AnalyzeState='No',
            Title=title
        )
        db.session.add(contract)
        db.session.commit()
        return jsonify({
            'success': True,
            'message': '',
            'content': contract.to_dict()
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/contract/uploadText', methods=['POST'])
def upload_contract_text():
    try:
        individual_name = request.form.get('individual_name')
        enterprise_name = request.form.get('enterprise_name')
        contract_content = request.form.get('contract_content')
        title = request.form.get('contract_title')
        contract = Contract(
            IndividualName=individual_name,
            EnterpriseName=enterprise_name,
            Text=contract_content,
            SignState='NoSign',
            AnalyzeState='No',
            Title=title
        )
        db.session.add(contract)
        db.session.commit()
        return jsonify({
            'success': True,
            'message': '',
            'content': contract.to_dict()
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/contract/download', methods=['GET'])
def download_contract():
    try:
        contract_id = int(request.args.get('contract_id'))
        contract = Contract.query.get(contract_id)
        dirpath = './resources/tmp_contract_files'
        filename = str(contract_id)+'-contract.txt'
        write_contract_to_file(contract, dirpath+'/'+filename)
        dir = os.path.join(os.getcwd(), 'resources', 'tmp_contract_files')
        print(dir)
        return send_from_directory(dir, filename)
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/contract/sign', methods=['POST'])
def sign_contract():
    try:
        user_name = request.form.get('user_name')
        user_type = request.form.get('user_type')
        contract_id = int(request.form.get('contract_id'))
        password = request.form.get('user_passwd')
        if user_type == 'individual':
            user = IndividualUser.query.filter(IndividualUser.Nickname==user_name).first()
            if not user.verify_password(password):
                return jsonify({
                    'success': False,
                    'message': '用户密码错误',
                    'content': None
                })
        elif user_type == 'enterprise':
            user = EnterpriseUser.query.filter(EnterpriseUser.Name==user_name).first()
            # 企业每签订一份合同需要收费
            user.FeeToPay += Config.CONTRACT_FEE
            if not user.verify_password(password):
                return jsonify({
                    'success': False,
                    'message': '用户密码错误',
                    'content': None
                })
        contract = Contract.query.get(contract_id)
        if contract.TimeSignature is None:
            contract.TimeSignature = get_time_signature(contract.Text)

        signature = get_signature(user_name, contract.Text)
        if user_type == 'individual':
            contract.IndividualSign = signature
            if contract.SignState is None or contract.SignState == 'NoSign':
                contract.SignState = 'Individual'
            else:
                contract.SignState = 'BothSign'
        else:
            contract.EnterpriseSign = signature
            if contract.SignState is None or contract.SignState == 'NoSign':
                contract.SignState = 'Enterprise'
            else:
                contract.SignState = 'BothSign'
        db.session.commit()
        return jsonify({
            'success': True,
            'message': '',
            'content': contract.to_dict()
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })

