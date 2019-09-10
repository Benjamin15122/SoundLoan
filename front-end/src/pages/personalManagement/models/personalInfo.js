import request from '@/utils/request';
import { message } from 'antd';

export default {
  namespace: 'personalManagement-personalInfo',
  state: {},
  reducers: {
    setInfo(_, { info }) {
      return info;
    },
  },
  effects: {
    *getPersonalInfo({ id, callback }, { call, put }) {
      const { success, content } = yield call(request, `/api/infoMan/indUserInfo?id=${id}`);
      yield put({ type: 'setInfo', info: content });
      if (callback) callback(content);
    },

    *updatePersonalInfo({ id, property, value }, { call, put }) {
      const response = yield call(request.post, `/api/infoMan/changeIndUser`, {
        data: { id: 1, name: 'haha' },
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      debugger;
    },
  },
};
