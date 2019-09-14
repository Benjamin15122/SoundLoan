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
    // *getPersonalInfo({ id, callback }, { call, put }) {
    //   const { success, content } = yield call(request, `/api/personal`);
    //   yield put({ type: 'setInfo', info: content });
    //   if (callback) callback(content);
    // },

    // *updatePersonalInfo({ id, property, value }, { call, put }) {
    //   const response = yield call(request.post, `/api/infoMan/changeIndUser`, {
    //     data: { id: 1, name: 'haha' },
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   });
    // },
    *getPersonalInfo({ id, callback }, { call, put }) {
      const info = yield call(request, `/api/personal?id=${id}`);
      yield put({ type: 'setInfo', info });
      if (callback) callback(info);
    },
    *updatePersonalInfo({ id, newInfo }, { call, put }) {
      const info = yield call(request.put, `/api/personal?id=${id}`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInfo),
      });
      yield put({ type: 'setInfo', info });
    },
  },
};
