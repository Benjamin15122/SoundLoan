import request from '@/utils/request'

export default {
  namespace: "personalManagement-contractDetectReport",
  state: [],
  reducers: {
    setReport(_, { report }) { return report }
  },
  effects: {
    *getReport({ id }, { call, put }) {
      const { success,content } = yield call(request, `/apis/contract/getAnalyze?contract_id=${id}`)
      if(success) yield put({ type: "setReport", report: content })
    }
  }
}