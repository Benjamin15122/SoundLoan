import { fakeSubmitForm, uploanAndAnalyze, makePayment } from './service';

const Model = {
  namespace: 'stepForm',
  state: {
    current: 'info',
    step: {
      fake_advertising: 'Yes',
      loan_consistent_with_actual: 'Yes',
    },
    paid: false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((path) => {
        if (path.pathname === "/contractDetect" && path.query && path.query.total_amount) {
          dispatch({
            type: 'markAsPaid',
          });
        }
      })
    }
  },
  effects: {
    *submitStepForm({ payload }, { call, put }) {
      const params = {
        nickname: payload.individual_name,
        loan_consistent_with_actual: payload.loan_consistent_with_actual,
        fake_advertising: payload.fake_advertising,
        individual_name: payload.individual_name,
        enterprise_name: payload.enterprise_name,
        contract_text: payload.contract_text,
        contract_image: '',
        contract_title: payload.contract_title,
        contract_type: 'text'
      }
      const response = yield call(uploanAndAnalyze, params);
      if (response.success === true) {
        yield put({
          type: 'saveAnalyzeResult',
          payload: response.content
        })
      }
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
    *getPayUrl({payload},{call,put}){
      const response = yield call(makePayment, payload)
      yield put({
        type: 'savePayUrl',
        payload: response.content
      })
    },
    *submitImage({ payload }, { call, put }) {
      const params = {
        nickname: payload.individual_name,
        loan_consistent_with_actual: payload.loan_consistent_with_actual,
        fake_advertising: payload.fake_advertising,
        individual_name: payload.individual_name,
        enterprise_name: payload.enterprise_name,
        contract_text: "",
        contract_image: payload.contract_image,
        contract_title: payload.contract_title,
        contract_type: "image"
      }
      const response = yield call(uploanAndAnalyze, params);
      if (response.success === true) {
        yield put({
          type: 'saveAnalyzeResult',
          payload: response.content
        })
      }
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    }
  },
  reducers: {
    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step, ...payload } };
    },

    saveAnalyzeResult(state, { payload }) {
      return { ...state, result: payload }
    },

    savePayUrl(state, { payload }) {
      return { ...state, payUrl: payload }
    },

    markAsPaid(state) {
      return { ...state, paid: true }
    }
  },
};
export default Model;
