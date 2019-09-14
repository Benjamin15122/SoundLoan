import request from '@/utils/request'
import { message } from 'antd'

export default {
  namespace: "personalManagement-loanList",
  state: [],
  reducers: {
    setList(_, { list }) { return list }
  },
  effects: {
    *getLoanList(_, { call, put }) {
      const list = yield call(request, '/api/loans')
      yield put({ type: "setList", list })
    },
    *cancelLoan({ id }, { call, put }) {
      const list = yield call(request.delete, `/api/loans?id=${id}`)
      yield put({ type: "setList", list })
    },
    *getRealLoanList({ user_name, callback }, { call, put }) {
      const { success, content } = yield call(request, `/apis/infoMan/getMyApply?user_name=${user_name}`)
      yield put({ type: "setList", list: content })
      if (callback) callback(content)
    },
    *updateEvaluation({ user, loan, evaluation, score }, { call, put }) {
      let path =
        '/apis/infoMan/addProductComment?' +
        `company_id=${loan.lender_id}&` +
        `product_id=${loan.product_id}&` +
        `user_id=${user.id}&` +
        `comment=${evaluation}&` +
        `score=${score}`

      const { success } = yield call(request.post, path)

      message.success("评价成功",0.5)
    }
  }
}
