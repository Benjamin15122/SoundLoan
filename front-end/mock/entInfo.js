export default {
  'GET /news/getNews': {
    result: true,
    reason: '',
    return_object: [
      {
        enterprise_name: '大企业',
        news_title: '新闻标题',
        news_link: '新闻链接',
        distribution_date: '发布日期',
        news_source: '来源 xx 社',
        news_extract: '新...闻...摘...要...新...闻...摘...要...',
      },
      {
        enterprise_name: '小企业',
        news_title: '新闻标题',
        news_link: '新闻链接',
        distribution_date: '发布日期',
        news_source: '来源 xx 社',
        news_extract: '新...闻...摘...要...新...闻...摘...要...',
      },
      {
        enterprise_name: '金牌贷贷贷',
        news_title: '新闻标题',
        news_link: '新闻链接',
        distribution_date: '发布日期',
        news_source: '来源 xx 社',
        news_extract: '新...闻...摘...要...新...闻...摘...要...',
      },
    ],
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
      },
    ],
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
      },
    ],
  },
  'GET /infoMan/entUserInfo': {
    content: {
      name: '某某企业',
      foundation_date: '某年某月某日',
      corporate_capital: '很多',
      register_capital: '大量',
      legal_person_name: '某人',
      contact: '150xxxx9999',
      website: 'www.mm.com',
      address: '某省某市某某区',
      description: '企业介绍...',
    },
  },
  'GET /authen/getEnterpriseChange': {
    content: [
      {
        change_item: '法人',
        create_time: '某年末日',
        change_time: '那年今日',
        content_before: '之前的值',
        content_after: '现在的值',
      },
    ],
  },
  'GET /authen/getEnterpriseRelation': {
    content: [
      {
        name: '关联主体的名字',
        label: '关联主体的标签',
        properties: '关系标签，如法人，参股，监事',
        type: '关系类型',
      },
    ],
  },
};
