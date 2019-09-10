export default {
  'GET /news/getNews': {
    result: true,
    reason: '',
    return_object: [
      {
        'enterprise_name': '企业名称',
        'news_title': '新闻标题',
        'news_link': '新闻链接',
        'distribution_date': '发布日期'
      },
      {
        'enterprise_name':
          '企业名称',
        'news_title':
          '新闻标题',
        'news_link':
          '新闻链接',
        'distribution_date':
          '发布日期'
      },
      {
        'enterprise_name':
          '企业名称',
        'news_title':
          '新闻标题',
        'news_link':
          '新闻链接',
        'distribution_date':
          '发布日期'
      },
      {
        'enterprise_name':
          '企业名称',
        'news_title':
          '新闻标题',
        'news_link':
          '新闻链接',
        'distribution_date':
          '发布日期'
      },
      {
        'enterprise_name':
          '企业名称',
        'news_title':
          '新闻标题',
        'news_link':
          '新闻链接',
        'distribution_date':
          '发布日期'
      },
      {
        'enterprise_name':
          '企业名称',
        'news_title':
          '新闻标题',
        'news_link':
          '新闻链接',
        'distribution_date':
          '发布日期'
      },
    ]
  },
  'GET /enterprise/recommendation': {
    success: true,
    message: '',
    content: [
      {
        name: '大企业',
        address: '江苏省南京市',
        website: 'www.bigEnterprise.com',
        contact: '13876876768',
        credit_score: 3,
      }
    ]
  },
  'GET /infoMan/searchEnt': {
    success: true,
    message: '',
    content: [
      {
        name: '搜索到的企业',
        address: '江苏省南京市',
        website: 'www.bigEnterprise.com',
        contact: '13876876768',
        credit_score: 3,
      }
    ]
  },
  'GET /infoMan/entProductComment': {
    'content': [
      {
        'comment': 'balabala_1_1',
        'product_name': '金利来小额贷',
        'score': 1,
        'user_id': 1
      }, {
        'comment': 'balabala_2_1',
        'product_name': '金利来小额贷',
        'score': 4,
        'user_id': 2
      }, {
        'comment': 'balabala_1_3',
        'product_name': '要你命3000贷',
        'score': 3,
        'user_id': 1
      }, {
        'comment': 'balabala_2_3',
        'product_name': '要你命3000贷',
        'score': 4,
        'user_id': 2
      }
    ],
    'success': true
  }
}
