export default {
  'GET /infoMan/entProductComment': {
    success: true,
    message: '',
    content: [{
      'comment': '很好，下次再来',
      'product_id': 1,
      'product_name': '金坷垃小额贷',
      'score': 5,
      'user_id': 1,
      'user_name': 'Bad man'
    }, {
      'comment': '非常棒',
      'product_id': 1,
      'product_name': '金坷垃小额贷',
      'score': 4,
      'user_id': 2,
      'user_name': 'bad girl'
    }, {
      'comment': '不太好，慎入',
      'product_id': 2,
      'product_name': '要你命3000贷',
      'score': 3,
      'user_id': 1,
      'user_name': 'bad girl'
    }, {
      'comment': '还行吧，可以',
      'product_id': 2,
      'product_name': '要你命3000贷',
      'score': 4,
      'user_id': 2,
      'user_name': 'bad girl'
    }]
  },
  'POST /infoMan/addCommentComplain': {
    success: true,
  },
  'GET /infoMan/entLoanApply': {
    content: [
      {
        'id': '申请的id',
        'ind_user_name': '刘三',
        'lender_id': '借款者的id',
        'debtor_id': '放贷者的id',
        'product_id': '产品的id',
        'contract_id': '对应合同的id',
        'loan_money': '金额',
        'rate': '年利率',
        'app_date_timestamp': 'AppDateTimestamp',
        'due_date_timestamp': 'DueDateTimestamp',
        'start_date_timestamp': 'StartDateTimestamp',
        'end_date_timestamp': 'EndDateTimestamp',
        'repay_status': 'overdue',
        'order_status': 'applied',
        'default_prob': '1%',
      }, {
        'id': '申请的id',
        'ind_user_name': '王五',
        'lender_id': '借款者的id',
        'debtor_id': '放贷者的id',
        'product_id': '产品的id',
        'contract_id': '对应合同的id',
        'loan_money': '金额',
        'rate': '年利率',
        'app_date_timestamp': 'AppDateTimestamp',
        'due_date_timestamp': 'DueDateTimestamp',
        'start_date_timestamp': 'StartDateTimestamp',
        'end_date_timestamp': 'EndDateTimestamp',
        'repay_status': 'ongoing',
        'order_status': 'auditing',
        'default_prob': '6%',
      }, {
        'id': '申请的id',
        'ind_user_name': '陈大厦',
        'lender_id': '借款者的id',
        'debtor_id': '放贷者的id',
        'product_id': '产品的id',
        'contract_id': '对应合同的id',
        'loan_money': '金额',
        'rate': '年利率',
        'app_date_timestamp': 'AppDateTimestamp',
        'due_date_timestamp': 'DueDateTimestamp',
        'start_date_timestamp': 'StartDateTimestamp',
        'end_date_timestamp': 'EndDateTimestamp',
        'repay_status': 'done',
        'order_status': 'uploading_contract',
        'default_prob': '4%',
      }, {
        'id': '申请的id',
        'ind_user_name': '王美万',
        'lender_id': '借款者的id',
        'debtor_id': '放贷者的id',
        'product_id': '产品的id',
        'contract_id': '对应合同的id',
        'loan_money': '金额',
        'rate': '年利率',
        'app_date_timestamp': 'AppDateTimestamp',
        'due_date_timestamp': 'DueDateTimestamp',
        'start_date_timestamp': 'StartDateTimestamp',
        'end_date_timestamp': 'EndDateTimestamp',
        'repay_status': 'overdue',
        'order_status': 'effective',
        'default_prob': '6%',
      }, {
        'id': '申请的id',
        'ind_user_name': '郑德德',
        'lender_id': '借款者的id',
        'debtor_id': '放贷者的id',
        'product_id': '产品的id',
        'contract_id': '对应合同的id',
        'loan_money': '金额',
        'rate': '年利率',
        'app_date_timestamp': 'AppDateTimestamp',
        'due_date_timestamp': 'DueDateTimestamp',
        'start_date_timestamp': 'StartDateTimestamp',
        'end_date_timestamp': 'EndDateTimestamp',
        'repay_status': 'ongoing',
        'order_status': 'finished',
        'default_prob': '2%',
      }, {
        'id': '申请的id',
        'ind_user_name': '王弼陈',
        'lender_id': '借款者的id',
        'debtor_id': '放贷者的id',
        'product_id': '产品的id',
        'contract_id': '对应合同的id',
        'loan_money': '金额',
        'rate': '年利率',
        'app_date_timestamp': 'AppDateTimestamp',
        'due_date_timestamp': 'DueDateTimestamp',
        'start_date_timestamp': 'StartDateTimestamp',
        'end_date_timestamp': 'EndDateTimestamp',
        'repay_status': 'done',
        'order_status': 'applied',
        'default_prob': '4%',
      }, {
        'id': '申请的id',
        'ind_user_name': '刘帕兰',
        'lender_id': '借款者的id',
        'debtor_id': '放贷者的id',
        'product_id': '产品的id',
        'contract_id': '对应合同的id',
        'loan_money': '金额',
        'rate': '年利率',
        'app_date_timestamp': 'AppDateTimestamp',
        'due_date_timestamp': 'DueDateTimestamp',
        'start_date_timestamp': 'StartDateTimestamp',
        'end_date_timestamp': 'EndDateTimestamp',
        'repay_status': 'done',
        'order_status': 'uploading_contract',
        'default_prob': '7%',
      }, {
        'id': '申请的id',
        'ind_user_name': '陈曦',
        'lender_id': '借款者的id',
        'debtor_id': '放贷者的id',
        'product_id': '产品的id',
        'contract_id': '对应合同的id',
        'loan_money': '金额',
        'rate': '年利率',
        'app_date_timestamp': 'AppDateTimestamp',
        'due_date_timestamp': 'DueDateTimestamp',
        'start_date_timestamp': 'StartDateTimestamp',
        'end_date_timestamp': 'EndDateTimestamp',
        'repay_status': 'overdue',
        'order_status': 'effective',
        'default_prob': '2%',
      }, {
        'id': '申请的id',
        'ind_user_name': '马东',
        'lender_id': '借款者的id',
        'debtor_id': '放贷者的id',
        'product_id': '产品的id',
        'contract_id': '对应合同的id',
        'loan_money': '金额',
        'rate': '年利率',
        'app_date_timestamp': 'AppDateTimestamp',
        'due_date_timestamp': 'DueDateTimestamp',
        'start_date_timestamp': 'StartDateTimestamp',
        'end_date_timestamp': 'EndDateTimestamp',
        'repay_status': 'overdue',
        'order_status': 'finished',
        'default_prob': '3%',
      }, {
        'id': '申请的id',
        'ind_user_name': '牛细',
        'lender_id': '借款者的id',
        'debtor_id': '放贷者的id',
        'product_id': '产品的id',
        'contract_id': '对应合同的id',
        'loan_money': '金额',
        'rate': '年利率',
        'app_date_timestamp': 'AppDateTimestamp',
        'due_date_timestamp': 'DueDateTimestamp',
        'start_date_timestamp': 'StartDateTimestamp',
        'end_date_timestamp': 'EndDateTimestamp',
        'repay_status': 'overdue',
        'order_status': 'finished',
        'default_prob': '4%',
      }, {
        'id': '申请的id',
        'ind_user_name': '荸荠',
        'lender_id': '借款者的id',
        'debtor_id': '放贷者的id',
        'product_id': '产品的id',
        'contract_id': '对应合同的id',
        'loan_money': '金额',
        'rate': '年利率',
        'app_date_timestamp': 'AppDateTimestamp',
        'due_date_timestamp': 'DueDateTimestamp',
        'start_date_timestamp': 'StartDateTimestamp',
        'end_date_timestamp': 'EndDateTimestamp',
        'repay_status': 'ongoing',
        'order_status': 'applied',
        'default_prob': '4%',
      },
    ]
  },
  'POST /contract/getAll': {
    content: [
      {
        'id': '01',
        'contract_title': '利民贷款',
        'sign_state': 'BothSign',
        'analyze_state': '合同分析状态',
        'individual_name': '万虽然',
        'enterprise_name': '示例企业',
      },
      {
        'id': '02',
        'contract_title': '小额贷',
        'sign_state': 'NoSign',
        'analyze_state': '合同分析状态',
        'individual_name': '刘德水',
        'enterprise_name': '示例企业',
      },
      {
        'id': '03',
        'contract_title': '精品贷',
        'sign_state': 'Individual',
        'analyze_state': '合同分析状态',
        'individual_name': '王八码',
        'enterprise_name': '示例企业',
      },
      {
        'id': '04',
        'contract_title': '优精品贷',
        'sign_state': 'Enterprise',
        'analyze_state': '合同分析状态',
        'individual_name': '张全德',
        'enterprise_name': '示例企业',
      },
    ]
  },
  'GET /contract/getContent': {
    content: [
      'title',
      '合同内容'
    ]
  },
  'Get /infoMan/entUserInfo':{
    success:true,
    message:'',
    content:{
      'id':1,
      'name':'圣地亚哥农资集团',
      'foundation_date':'2009/5/19',
      'corporate_capital':'500,000',
      'legal_person_name':'周巍立',
      'register_capital':'10,000',
      'loan_rate_min':300,
      'loan_rate_max':500,
      'address':'中国河南郑州市金水区农业路国际企业中心A座906室',
      'website':'http://51sole1921548.51sole.com/',
      'contact':'86-0371-63691985',
      'description':'本公司位于中国.河南省.郑州市.金水区郑州市农业路国际企业中心A座906室，主营 金脉动，金坷垃 等。公司秉承“顾客至上，锐意进取”的经营理念，坚持“客户第一”的原则为广大客户提供优质的服务。欢迎惠顾！  美国圣地亚戈国际农资集团是一家—，注册资本为1万，所在地区位于河南郑州市,我们以诚信、实力和质量获得业界的高度认可，坚持以客户为核心，“质量到位、服务一流”的经营理念为广大客户提供优质的服务。欢迎各界朋友莅临美国圣地亚戈国际农资集团参观、指导和业务洽谈。您如果对我们感兴趣的话，可以直接联系我们或者留下联系方式。联系人周巍立 先生，电话：-，传真：-，联系地址：河南郑州市中国...金水区农业路国际企业中心A座906室。',
      'credit_score':10,
      'fee_to_pay':100
    },
  }
}
