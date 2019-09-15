import request from '@/utils/request'

export default {
  namespace: "personalManagement-contractList",
  state: [],
  reducers: {
    setList(_, { list }) { return list },
    updateContract(list, { contract }) { return list.map(c => c.id === contract.id ? contract : c) }
  },
  effects: {
    *getContractList({ user_name }, { call, put }) {

      let formData = new FormData()
      formData.append("user_name", user_name)
      formData.append("user_type", "individual")

      const { content } = yield call(request.post, '/apis/contract/getAll', { body: formData })
      yield put({ type: "setList", list: content })
    },
    *signContract({ user_name, user_passwd, contract_id }, { call, put }) {
      let formData = new FormData()
      formData.append("user_name", user_name)
      formData.append("user_type", "individual")
      formData.append("contract_id", contract_id)
      formData.append("user_passwd", user_passwd)

      const { success, content } = yield call(request.post, '/apis/contract/sign', { body: formData })
      if (success) yield put({ type: "updateContract", contract: content })
    },
    *detectContract({ nickname, contract_id, loan_consistent_with_actual, fake_advertising }, { call, put }) {
      let formData = new FormData()
      formData.append("nickname", nickname)
      formData.append("contract_id", contract_id)
      formData.append("loan_consistent_with_actual", loan_consistent_with_actual)
      formData.append("fake_advertising", fake_advertising)

      const { success, content } = yield call(request.post, '/apis/contract/analyze', { body: formData })
      if (success) yield put({ type: "getContractList", user_name: nickname })
    }
  }
}