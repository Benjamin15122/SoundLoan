from flask import jsonify, request, Response

from app import app, db
from models.EnterpriseNews import EnterpriseNews


@app.route("/getNews", methods=["GET"])
def get_news():
    '''
    test_name = '阿里'
    news = EnterpriseNews.query.filter(EnterpriseNews.EnterpriseName == test_name).all()
    print(news[1].to_dict()['distribution_date'])
    '''
    enterprise_name = request.args.get('enterprise_name', None)
    if enterprise_name is None:
        return jsonify({'success': False, 'message': 'Missing param enterprise_name.'})
    news = EnterpriseNews.query.filter(EnterpriseNews.EnterpriseName == enterprise_name).all()
    if news is None:
        return jsonify({'success': False, 'message': 'news of the enterprise not crawled.'})

    returned_news = [item.to_dict() for item in news]
    return jsonify({'success': True, 'content': returned_news})