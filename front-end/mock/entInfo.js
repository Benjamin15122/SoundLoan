export default {
  'GET /news/getNews': {
    result: true,
    reason: '',
    return_object: [
      {
        enterprise_name: '圣地亚哥农资集团',
        news_title: '媒体起底“金坷垃”诈骗团伙：山寨多个联合国机构',
        news_link: 'https://finance.huanqiu.com/article/9CaKrnJRTMr',
        distribution_date: '2015-12-01',
        news_source: '环球时报',
        news_extract: '在大概10多年前，一位名叫麻林涛的“农业科学家”，发明了一种微生物肥料，名叫“金坷垃”。当时，一些媒体还进行了报道，称这种肥料获得了农业部等多个部门颁发的大奖。\n不过，令“金坷垃”真正成为中国互联网历史上一大传奇的，却并不是因为这些报道中宣称的“功效”，而是“金坷垃”的公司所制作的一部部异常离奇的广告片！',
      },
      {
        enterprise_name: '圣地亚哥农资集团',
        news_title: '逐渐失宠的“最土”A站路在何方？',
        news_link: 'https://36kr.com/p/5163470',
        distribution_date: '2018-11-23',
        news_source: '壹娱观察',
        news_extract: '整个2018年，弥漫着二次元和土味的气息。前者伴随哔哩哔哩（以下简称B站）在纳斯达克上市后的一系列商业化举动，让二次元受众逐渐向泛二次元群体扩散；后者借王菊、快手等媒介，成为大众流行文化中的一员。',
      },
      {
        enterprise_name: '圣地亚哥农资集团',
        news_title: '被快手收购1年后重回二次元赛道 A站重金扶持UP主',
        news_link: 'https://china.huanqiu.com/article/9CaKrnKmIec',
        distribution_date: '2019-08-15',
        news_source: '每日经济',
        news_extract: '作为曾经最早的ACG圣地，如今大家说熟知的“鬼畜”“金坷垃”等最初都起源于A站。12年前，以动画连载为初始形态的AcFun在武汉建立。在漫长的成长中，A站被不断地“颠来倒去”，经营者换了一茬又一茬，A站和后来居上的B站的差距也越来越大。2018年，12岁的A站终究走到了濒临死亡的至暗时刻。',
      },
      {
        enterprise_name: '圣地亚哥农资集团',
        news_title: '中国智商税简史',
        news_link: 'https://finance.sina.com.cn/china/gncj/2019-05-09/doc-ihvhiqax7601143.shtml',
        distribution_date: '2019-05-09',
        news_source: '新浪财经-自媒体综合',
        news_extract: '这几天，一个富豪花650万美元送女儿进斯坦福的事，成了大新闻。',
      },
      {
        enterprise_name: '圣地亚哥农资集团',
        news_title: '上市一年，B站脱轨',
        news_link: 'https://36kr.com/p/5196560',
        distribution_date: '2019-04-20',
        news_source: '锌刻度',
        news_extract: '上市时间满一年不久，哔哩哔哩就深陷舆论漩涡。不仅收到蔡徐坤发出的一纸律师函，还因为低俗内容泛滥而被央视点名批评。',
      },
    ],
  },
  'GET /enterprise/recommendation': {
    success: true,
    message: '',
    content: [
      {
        name: '圣地亚哥农资集团',
        address: '中国河南郑州市金水区农业路国际企业中心A座906室',
        website: 'http://51sole1921548.51sole.com/',
        contact: '86-0371-63691985',
        credit_score: 3,
      },
    ],
  },
  'GET /infoMan/searchEnt': {
    success: true,
    message: '',
    content: [
      {
        name: '圣地亚哥农资集团',
        address: '中国河南郑州市金水区农业路国际企业中心A座906室',
        website: 'http://51sole1921548.51sole.com/',
        contact: '86-0371-63691985',
        credit_score: 3,
      },
    ],
  },
  'GET /infoMan/entUserInfo': {
    content: {
      name: '圣地亚哥农资集团',
      foundation_date: '2009/5/19',
      corporate_capital: '500,000',
      register_capital: '10,000',
      legal_person_name: '周巍立',
      contact: '86-0371-63691985',
      website: 'http://51sole1921548.51sole.com/',
      address: '中国河南郑州市金水区农业路国际企业中心A座906室',
      description: '本公司位于中国.河南省.郑州市.金水区郑州市农业路国际企业中心A座906室，主营 金脉动，金坷垃 等。公司秉承“顾客至上，锐意进取”的经营理念，坚持“客户第一”的原则为广大客户提供优质的服务。欢迎惠顾！  美国圣地亚戈国际农资集团是一家—，注册资本为1万，所在地区位于河南郑州市,我们以诚信、实力和质量获得业界的高度认可，坚持以客户为核心，“质量到位、服务一流”的经营理念为广大客户提供优质的服务。欢迎各界朋友莅临美国圣地亚戈国际农资集团参观、指导和业务洽谈。您如果对我们感兴趣的话，可以直接联系我们或者留下联系方式。联系人周巍立 先生，电话：-，传真：-，联系地址：河南郑州市中国...金水区农业路国际企业中心A座906室。',
    },
  },
  'GET /authen/getEnterpriseChange': {
    content: [
      {
        change_item: '联系人',
        create_time: '2009/8/13',
        change_time: '2009/8/13',
        content_before: '-',
        content_after: '周巍立',
      },
    ],
  },
  'GET /authen/getEnterpriseRelation': {
    content: [
      {
        name: '周巍立',
        label: '联系人',
        properties: '法人',
        type: '代表',
      },
    ],
  },
};
