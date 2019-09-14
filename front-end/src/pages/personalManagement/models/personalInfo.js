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
      const { success, content } = yield call(request, `/apis/infoMan/indUserInfo?id=${id}`);
      yield put({ type: 'setInfo', info: content });
      if (callback) callback(content);
    },
    *updatePersonalInfo({ id, newInfo, callback }, { call, put }) {
      const formData = new FormData()
      Object.keys(newInfo).forEach(i => formData.append(i, newInfo[i]))
      formData.append("id", id)
      const response = yield call(request.post, `/apis/infoMan/changeIndUser`, { body: formData })
      yield put({ type: "getPersonalInfo", id, callback })
      message.success("保存成功",0.5)
    },
    // *getPersonalInfo({ id, callback }, { call, put }) {
    //   const info = yield call(request, `/api/personal?id=${id}`);
    //   yield put({ type: 'setInfo', info });
    //   if (callback) callback(info);
    // },
    // *updatePersonalInfo({ id, newInfo }, { call, put }) {
    //   const info = yield call(request.put, `/api/personal?id=${id}`, {
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newInfo),
    //   });
    //   yield put({ type: 'setInfo', info });
    // },
  },
};
