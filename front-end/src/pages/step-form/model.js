import { fakeSubmitForm } from './service';

const Model = {
  namespace: 'stepForm',
  state: {
    current: 'info',
    step: {
      fake_advertising: 'Yes',
      loan_consistent_with_actual: 'Yes',
    },
  },
  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },
  reducers: {
    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step, ...payload } };
    },
  },
};
export default Model;
