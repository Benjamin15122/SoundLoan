import request from '@/utils/request'

export default {
  namespace: "personalManagement-contractList",
  state: [],
  reducers: {
    setList(_, { list }) { return list }
  },
  effects: {
    *getContractList({ user_name }, { call, put }) {

      let formData = new FormData()
      formData.append("user_name", user_name)
      formData.append("user_type", "individual")

      const { content } = yield call(request.post, '/apis/contract/getAll', { body: formData })
      yield put({ type: "setList", list: content })
    }
  }
}