import request from '@/utils/request'

export default {
  namespace: "personalManagement-tagList",
  state: {},
  reducers: {
    setList(_, { list }) { return list }
  },
  effects: {
    *getTagList(_, { call, put }) {
      const list = yield call(request, '/api/tags')
      yield put({ type: "setList", list })
    }
  }
}