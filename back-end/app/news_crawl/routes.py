from flask import jsonify, request, Response

from app import app, db
from models.EnterpriseNews import EnterpriseNews


@app.route("/news/getNews", methods=["GET"])
def get_news():

    # test_name = '阿里'
    # news = EnterpriseNews.query.filter(EnterpriseNews.EnterpriseName == test_name).all()
    # print(news[1].to_dict()['distribution_date'])
    company_name = request.args.get('company_name', None)
    if company_name is None:
        return jsonify({'success': False, 'message': '请输入正确的企业名称'})
    news = EnterpriseNews.query.filter(EnterpriseNews.EnterpriseName == company_name).all()
    if len(news) == 0:
        return jsonify({'success': False, 'message': '未爬取该企业相关新闻，请于次日8:00后再次尝试'})

    returned_news = [item.to_dict() for item in news]
    return jsonify({'success': True, 'message': '已获取该企业最近新闻', 'content': returned_news})