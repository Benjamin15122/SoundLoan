let loanList = [
  { id: "1", client: "阿里巴巴", amount: "1,000,000", applyTime: "2019.5.16", state: "review" },
  { id: "2", client: "蒙牛", amount: "1,200,000", applyTime: "2019.5.19", state: "finished" },
  { id: "3", client: "伊利", amount: "2,000,000", applyTime: "2019.5.20", state: "review" },
  { id: "4", client: "Apple", amount: "900,000", applyTime: "2019.5.22", state: "finished" },
  { id: "5", client: "Huawei", amount: "1,300,000", applyTime: "2018.5.3", state: "review" },
  { id: "6", client: "Xiaomi", amount: "1,600,000", applyTime: "2019.6.16", state: "review" },
  { id: "7", client: "百度", amount: "100,000", applyTime: "2019.7.16", state: "review" },
  { id: "8", client: "腾讯", amount: "8,000,000", applyTime: "2019.9.16", state: "review" },
  { id: "9", client: "字节跳动", amount: "2,000,000", applyTime: "2019.5.4", state: "review" },
]

export default {
  'GET /api/loans': (req, res) => {
    res.send(loanList)
  },
  'DELETE /api/loans': (req, res) => {
    const { query } = req
    loanList = loanList.filter(loan => loan.id !== query.id)
    res.send(loanList)
  }
}