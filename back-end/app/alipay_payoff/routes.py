from utils.alipay_api_utils import *
from flask import jsonify, request
from config import *
from app import app
from models.ContractOrderFee import *


@app.route('/alipay/makePayment', methods=['POST'])
def get_pay_redirect_url():
    try:
        # 获取订单号，根据订单生成 支付订单
        # 支付订单包括: 订单号、支付金额、订单名称
        order_id = int(request.form.get('order_id'))
        amount = float(request.form.get('amount'))

        # order = ContractOrderFee(OrderId=order_id, Paid=0)
        # db.session.add(order)
        # db.session.commit()

        # 传递参数执行支付类里的direct_pay方法，返回签名后的支付参数，
        url = Config.alipay.direct_pay(
            subject="测试订单",  # 订单名称
            # 订单号生成，一般是当前时间(精确到秒)+用户ID+随机数
            out_trade_no=order_id,  # 订单号
            total_amount=amount,  # 支付金额
            return_url=Config.redirect_url  # 支付成功后，跳转url 【客户端显示】
        )

        # 将前面后的支付参数，拼接到支付网关
        # 注意：下面支付网关是沙箱环境，最终进行签名后组合成支付宝的url请求
        re_url = "https://openapi.alipaydev.com/gateway.do?{data}".format(data=url)

        # 返回的是支付宝的支付地址
        return jsonify({
            'success': True,
            'message': '',
            'content': re_url
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': ''
        })


# 这部分需要交给前端
@app.route('/alipay/completed', methods=['GET'])
def alipay_completed():
    return 'order completed'


# 用于接受支付宝的通知
@app.route('/alipay/notification', methods=['POST'])
def alipay_notify():
    # 获取 支付成功的 订单号
    # 修改数据库中订单状态以及其他操作
    order_no = request.form.get('out_trade_no')
    # order = ContractOrderFee.query.filter(ContractOrderFee.OrderId == order_no).first()
    # if order is None:
    #     order = ContractOrderFee(OrderId=order_no, Paid=1)
    #     db.session.add(order)
    #     db.session.commit()
    # else:
    #     order.Paid = 1
    #     db.session.commit()
    print('notification from alipay: %s' % order_no)

    # 返回支付宝success，否则会不间断的调用该回调
    return {'msg': 'success'}


# @app.route('/alipay/getOrderStatus', methods=['POST'])
# def get_order_status():
#     try:
#         order_no = request.form.get('order_id')
#         order = ContractOrderFee.query.filter(ContractOrderFee.OrderId == order_no).first()
#         if order is None or order.Paid==0:
#             return jsonify({
#                 'success': True,
#                 'message': '',
#                 'content': False
#             })
#         else:
#             return jsonify({
#                 'success': True,
#                 'message': '',
#                 'content': True
#             })
#     except Exception as e:
#         return jsonify({
#             'success': False,
#             'message': str(e),
#             'content': None
#         })
