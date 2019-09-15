import request from '@/utils/request'

export default {
  namespace: "personalManagement-contractContent",
  state: [],
  reducers: {
    setContent(_, { content }) { return content }
  },
  effects: {
    *getContent({ id }, { call, put }) {
      const { success, content } = yield call(request, `/apis/contract/getContent?contract_id=${id}`)
      if (success) yield put({ type: "setContent", content })
    }
  }
}