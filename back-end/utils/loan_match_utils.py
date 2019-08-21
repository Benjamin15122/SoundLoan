import math
from config import Config


def point_interval_linear_match(target: float, interval: tuple, laxity: float):
    '''
    计算一个点相对于某个区间的线性模糊隶属度
    :param target: 目标点的值
    :param interval: 区间软约束
    :param laxity: 线性松弛变量
    :return: 模糊隶属度
    '''
    if interval[0] <= target <= interval[1]:
        return 1
    elif target <= interval[0]:
        upper_bound = target * (1+laxity)
        return max((upper_bound-interval[0])/(upper_bound-target), 0)
    else:
        lower_bound = target * (1-laxity)
        return max((interval[1]-lower_bound)/(target-lower_bound), 0)


def point_interval_sigmoid_match(target: float, interval: tuple, ratio: float):
    '''
    计算某个点相对于某个区间的sigmoid式模糊隶属度
    :param target: 目标点的值
    :param interval: 区间软约束
    :param ratio: sigmoid函数约束，当target==interval.max_value时的模糊隶属度
    :return: 模糊隶属度
    '''
    l, h = interval[0], interval[1]
    p = (h-l)/2
    k = (-1/p)*math.log((1-ratio)/ratio)
    return 1/(1+math.exp(-k*(target-(h+l)/2)))


def demand_product_match(demand, product):
    '''
    某产品product相对于需求demand的匹配度
    :param demand:
    :param product:
    :return:
    '''
    amount_match = point_interval_linear_match(demand['amount_expect'],
                                               (product.AmountMin, product.AmountMax),
                                               Config.LINEAR_LAXITY)
    duration_match = point_interval_linear_match(demand['duration_expect'],
                                                 (product.DurationMin, product.DurationMax),
                                                 Config.LINEAR_LAXITY)
    rate_match = point_interval_sigmoid_match(demand['rate_expect'],
                                              (product.RateMin, product.RateMax),
                                              Config.SIGMOID_RATIO)
    return 0.3*amount_match+0.3*duration_match+0.4*rate_match


def match_products(demand, products):
    # TODO: 违约概率测算的模型出来之后加入进去
    match_score = [demand_product_match(demand, product) for product in products]
    index = sorted(range(len(match_score)), key=lambda k: match_score[k])
    return [products[i].to_dict() for i in index]
