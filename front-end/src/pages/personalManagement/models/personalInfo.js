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
      let body = {};
      body['id'] = id;
      body[property] = value;

      const response = yield call(request, `/api/infoMan/changeIndUser`, {
        headers: {
          'Content-type': 'application/json,charset=utf-8',
        },
        body: JSON.stringify(body),
      });

      debugger;
    },
  },
};
