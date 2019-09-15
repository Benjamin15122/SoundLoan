export default {
  'GET /news/getNews': {
    result: true,
    reason: '',
    return_object: [
      {
        enterprise_name: '人社部',
        news_title: '人社部加强养老金产品管理：一年3次产品备案被否暂停上新6个月',
        news_link: 'https://new.qq.com/omn/20190914/20190914A0HT1K00.html',
        distribution_date: '2019/9/15',
        news_source: '每日经济新闻',
        news_extract: '老金产品投资管理人在一个自然年度内发生3次养老金产品备案不予通过情形的，人社部将从第3次做出不予通过决定之日起，6个月内暂停受理其新养老金产品备案申请。',
      },
      {
        enterprise_name: '人社部',
        news_title: '人社部：健全完善技能人才评价体系 完善职业资格目录',
        news_link: 'http://baijiahao.baidu.com/s?id=1644184217744897075&wfr=spider&for=pc',
        distribution_date: '2019/9/15',
        news_source: 'TechWeb',
        news_extract: '高盛预计苹果公司股价将下跌26%，将苹果12个月的目标价格从187美元下调至165美元，对Apple的股票持中立评级。高盛表示，捆绑Apple TV+会致硬件利润率下滑。',
      },
      {
        enterprise_name: '人社部',
        news_title: '人社部：让养老保险政策待遇“看得懂算得清”',
        news_link: 'https://china.huanqiu.com/article/9CaKrnKmIec',
        distribution_date: '2019-09-08',
        news_source: '经济日报',
        news_extract: '按照“不忘初心、牢记使命”主题教育“为民服务解难题”的要求，人力资源和社会保障部在全系统推动养老保险政策待遇“看得懂算得清”工作，即：养老保险政策，让参保人“看得懂”；个人权益记录信息，让参保人“查得准”；养老保险待遇测算，让参保人“算得清”。',
      },
      {
        enterprise_name: '人社部',
        news_title: '人社部规范人力资源市场活动 惩戒严重违法失信服务机构',
        news_link: 'http://www.xinhuanet.com/politics/2019-09/06/c_1124966197.htm',
        distribution_date: '2019-09-06',
        news_source: '人民日报',
        news_extract: '近年来，人力资源市场活力不断激发，人力资源流动配置效率不断提高。同时，有些地方也出现了扰乱市场秩序的违法违规行为。\n对此，人社部部署开展了专项整治工作，制定出台相关意见，从加强日常监督管理、加大劳动保障监察执法力度、健全信用激励约束机制、提升公共服务水平等四个方面，对规范人力资源市场秩序提出具体举措。',
      },
      {
        enterprise_name: '人社部',
        news_title: '人社部李金生：我国形成了史上最大规模留学人员归国潮',
        news_link: 'http://www.xinhuanet.com/fortune/2019-08/26/c_1210257278.htm',
        distribution_date: '2019-08-26',
        news_source: '来源 xx 社',
        news_extract: '新华网北京8月26日电（汪舟）近日，由欧美同学会（中国留学人员联谊会）主办、全球化智库（CCG）承办的第14届中国留学人员创新创业论坛暨欧美同学会北京论坛在京举行。人力资源与社会保障部专业技术人员管理司副司长李金生出席论坛时表示，在各部门、各地方的共同努力下，十八大以来，已有累计283万留学人员学成归国，占改革开放以来回国总人数的2/3，形成了我国历史上最大规模的留学人员归国潮。',
      },
    ],
  },
  'GET /enterprise/recommendation': {
    success: true,
    message: '',
    content: [
      {
        name: '人社部',
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
