import re
from utils.contract_analyze_utils import *


class Rule:
    def __init__(self, name, match_strings, default_msg=''):
        self.name = name
        self.match_patterns = []
        if isinstance(match_strings, tuple):
            for each in match_strings:
                self.match_patterns.append(re.compile(each))
        else:
            self.match_patterns.append(re.compile(match_strings))
        self.default_msg = default_msg

    def match(self, term):
        for each in self.match_patterns:
            amount_term = each.search(term)
            if amount_term is not None:
                return term, self.default_msg
        return None


class PledgeRule(Rule):
    def __init__(self, rule_name='抵押政策',
                 match_strings='(质押|抵押)',
                 default_msg='抵押政策，注意抵押担保物价值是否与借款金额匹配。'):
        super(PledgeRule, self).__init__(rule_name, match_strings, default_msg=default_msg)

    def match(self, term):
        # 排除抵押无关的抵押编号，签字等条款
        if len(term) < 20:
            return None
        return super().match(term)


class LenderRule(Rule):
    """
    匹配放贷人，同传入的放贷公司做比较，确保还款对象是公司法人而非某个具体职员
    """
    def __init__(self,
                 rule_name='放贷人匹配',
                 match_strings=(r'(甲|乙)方（出借(人|方)）(：|:)',
                                r'(甲|乙)方（贷款(人|方)）(：|:)',
                                r'出借(人|方)(（.{0,5}）)?(：|:)',
                                r'贷款(人|方)(（.{0,5}）)?(：|:)')
                 ):
        super(LenderRule, self).__init__(rule_name, match_strings)
        self.borrower_term = re.compile('借款人|借贷方|借贷者|借贷人|借款方')

    def match(self, term: str):
        if self.borrower_term.search(term) is not None:
            return None
        else:
            for each in self.match_patterns:
                lend_term = each.search(term)
                if lend_term is not None:
                    return term, '出借方相关条款, 请确定出借方身份，防止出借方为个人。'
            return None


class AmountRule(Rule):
    """
    匹配借贷总金额，确定收款金额
    """
    def __init__(self, rule_name='匹配放贷金额',
                 match_strings=(r'借款金额.*人民币', r'借款金.*：', r'借款.*元'),
                 default_msg='借款金额条款，请确定实际收款金额与条例一致'):
        super(AmountRule, self).__init__(rule_name, match_strings, default_msg=default_msg)


class PeriodRule(Rule):
    '''
    确定还款期限
    '''
    def __init__(self, rule_name='匹配还款期限',
                 match_strings=(r'(还|借)款期限.*(为|是)：', r'(还|借)款期限.*：(年|月|日|天)',
                                r'\d+.*年.*\d+.*月.*\d+.*日.*至.*\d+.*年.*\d+.*月.*\d+.*日'),
                 default_msg=''):
        super(PeriodRule, self).__init__(rule_name, match_strings)

    def match(self, term):
        rtn = super().match(term)
        if rtn is None:
            return None
        else:
            p = re.compile(r'\d+时|\d+分|\d+秒')
            if p.search(term):
                return term, '请确定还款期限，该还款期限定义过于严格，请防范不能按时还款造成高额违约金的情况，防范套路贷'
            return term, '还款期限相关条款，请确定还款期限与实际还款周期是否一致'


class OtherCostsRule(Rule):
    def __init__(self, rule_name='其他费用',
                 match_strings=r'(手续费|技术服务费|中介费|保证金|保障费).*(元|\%)'):
        super(OtherCostsRule, self).__init__(rule_name, match_strings)

    def match(self, term):
        rtn = super().match(term)
        if rtn is None:
            return None
        # msg = self.match_patterns[0].findall(term)
        return term, '除正常计息外，上述条款另设有服务费用'


class OverDueRule(Rule):
    def __init__(self, rule_name='逾期罚款',
                 match_strings=r'(违约金|垫付服务费).*(元|\%)',
                 default_msg='注意，此条款申明了逾期风险违约金，需谨慎考虑违约损失！'):

        super(OverDueRule, self).__init__(rule_name, match_strings, default_msg=default_msg)


class OverDueInterestRule(Rule):
    def __init__(self, rule_name='逾期利息',
                 match_strings=r'逾期还款.*利率.*(\%)',
                 default_msg='此处申明了逾期罚息，注意辨别是否合理。'):
        super(OverDueInterestRule, self).__init__(rule_name, match_strings, default_msg=default_msg)


class InterestRule(Rule):
    def __init__(self, rule_name='利率政策',
                 match_strings=('年[化]?利率.*(\%)', '月[化]?利率.*(\%)', '日[化]?利率.*(\%)'),
                 default_msg='24%以下年利率受法律保护，24%~36%区间内为借贷双方协商收取，超过36%部分为违法所得，借贷方有权拒付。'
                 ):
        super(InterestRule, self).__init__(rule_name, match_strings, default_msg)

    def match_interest(self, target, term):
        interests = re.findall('\d+\.?\d*.{0,2}%', term)    # 这里要应对【12.3】%这样的情况
        interest = find_closest_substr(term, target, interests)
        interest = re.findall('\d+\.?\d*', interest)[0]
        return interest

    def match(self, term):
        try:
            year_interest = self.match_patterns[0].search(term)
            if year_interest is not None:
                interest = self.match_interest(r'年[化]?利率', term)
                return term, "合同声明年利率为{}%，".format(interest) + self.default_msg
            month_interest = self.match_patterns[1].search(term)
            if month_interest is not None:
                interest = float(self.match_interest(r'月[化]?利率', term))*12
                return term, "合同声明年利率为{}%，".format(interest) + self.default_msg
            day_interest = self.match_patterns[2].search(term)
            if day_interest is not None:
                interest = float(self.match_interest(r'日[化]?利率', term))*360
                return term, "合同声明年利率为{}%，".format(interest) + self.default_msg
            return None
        except Exception as err:
            print(err)
            return None


def analyze(text: str,
            loan_consistent_with_actual: bool,
            fake_advertising: bool):

    text = text_splitter(text)
    rules = (LenderRule(),
             AmountRule(),
             PeriodRule(),
             OtherCostsRule(),
             OverDueRule(),
             OverDueInterestRule(),
             PledgeRule(),
             InterestRule()
             )

    warning_msg, count_warning = {}, 0

    if loan_consistent_with_actual == 'No':
        count_warning += 1
        warning_msg[count_warning] = (u'合同金额与借贷金额不一致', u"可能是“虚高借款合同”、“伪造银行流水”套路，根据中华人民共和国法律，网贷中所谓服务费、咨询费、信息费等一律计入利息范畴，严格按照24%，36%这两个界限确定其性质。这种条款违背了我国合同法的规定： 借款的利息不得预先在本金中扣除。正常条款中借款金额严格等于还款金额。")

    if fake_advertising == 'Yes':
        count_warning += 1
        warning_msg[count_warning] = (u"“低息、免息、无抵押、无担保、快速放贷”宣传",
        u"可能为套路贷诱饵，吸引用户借款后，套路贷常常以“违约金”“保证金”等各种名目骗取受害人签订虚假 借款合同、抵押 借款合同或房产、车辆买卖委托书等各种套路文件。")

    for rule in rules:
        for term in text:
            result = rule.match(term)
            if result is not None:
                #print('Term: %s; \n Risk: %s;\n ' % (result[0], result[1]))
                count_warning += 1
                warning_msg[count_warning] = (result[0], result[1])

    for each in warning_msg:
        print(str(each)+": "+str(warning_msg[each][0]))
        print(str(warning_msg[each][1]))

    return warning_msg
