const infoList = [
  {
    apply_pass_time: -1,
    birth: '10000',
    credit_score: -1,
    house_loan: 0,
    house_property: 0,
    id: 1,
    job: 'whiteCollar',
    live_address: 'NJU',
    marriage: 'married',
    name: '\u4e00\u4f11',
    nickname: 'Lucy',
    other_debt_amount: -1,
    overdue_amount: -1,
    overdue_time: -1,
    pay_time: -1,
    repay_capital_amount: -1,
    repay_interset_amount: -1,
    residence_address: 'Nanjing University',
    salary: 10000,
    school: 'NJU',
    severe_overdue_time: -1,
    sex: 'female',
    unrepay_capital_amount: -1,
    unrepay_interest_amount: -1,
    vehicle_loan: 0,
    vehicle_property: 300000,
    work_address: 'NJU',
    work_year: 3,
  },
];

export default {
  'GET /api/personal': (req, res) => {
    const { query, baseUrl } = req;
    res.send(infoList.find(info => info.id == query.id));
  },
  'PUT /api/personal': (req, res) => {
    const { query, baseUrl, body } = req;
    let i = infoList.find(info => info.id == query.id);
    i = { ...i, ...body };
    res.send(i);
  },
};
