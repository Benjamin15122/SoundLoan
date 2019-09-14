import request from '@/utils/request'

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
    }
  }
}
