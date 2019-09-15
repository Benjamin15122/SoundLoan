const basicInfo = {
  name: '姓名',
  sex: '性别',
  residence_address: '家庭住址',
  school: '就读学校',
  work_address: '工作地址',
  live_address: '常住地址',
  marriage: '婚姻状况',
  salary: '月收入/元',
  vehicle_loan: '车贷/元',
  vehicle_property: '车产/元',
  house_loan: '房贷/元',
  house_property: '房产/元',
  birth: '生日',
  job: '职业',
  work_year: '工作年限',
};

const creditInfo = {
  apply_pass_time: '贷款成功次数',
  pay_time: '还清次数',
  credit_score: '个人信用分',
  other_debt_amount: '其他债务',
  overdue_amount: '逾期金额/元',
  overdue_time: '逾期次数',
  repay_capital_amount: '已还本金',
  repay_interset_amount: '已还利息',
  severe_overdue_time: '严重逾期次数',
  unrepay_capital_amount: '未还本金',
  unrepay_interest_amount: '未还利息',
};

export function infoParser(info) {
  let result = {
    id: info.id,
    nickname: info.nickname,
    basic: {},
    credit: {},
  };

  Object.keys(basicInfo).forEach(key => (result.basic[basicInfo[key]] = info[key]));
  Object.keys(creditInfo).forEach(key => (result.credit[creditInfo[key]] = info[key]));

  return result;
}

export function propertyParser(property) {
  let result = '';
  Object.keys(basicInfo).forEach(key => {
    if (basicInfo[key] === property) result = key;
  });
  Object.keys(creditInfo).forEach(key => {
    if (creditInfo[key] === property) result = key;
  });
  return result;
}

export function editableParser(property){
  return property!=="姓名"&&property!=="性别"&&property!=="生日"
}