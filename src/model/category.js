import request from '../util/request'; 
import * as categoryService from '../service/category';
import { message } from 'antd';
import * as common from '../util/common';
import { routerRedux } from 'dva/router';

const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};

export default {
  namespace: 'category',
  state: {
    categoryList: [],
    categoryInfo:{},
  },
  effects: {
    *queryInitTable({ payload }, { call, put }) {
      let rsp = yield call(categoryService.queryList,payload);
      if(rsp.resultCode=='0000'){
          yield put({ type: 'saveList', payload: { categoryList: rsp.data } });
      }else if(rsp.resultCode=='1001'){
          common.clearAllCookie();
          yield put(routerRedux.push('/user'));
      }else{
          message.error(rsp.msg);
      }
    },
    *getInfo({ payload }, { call, put }){
        let getInfoResult = yield call(categoryService.getInfo,payload);
        yield put({ type: 'getInfoReducer', payload: { categoryInfo: getInfoResult.data } });
    },
    *modifySort({ payload }, { call, put }){
        let modifySortResult = yield call(categoryService.modifySort,payload);
        if(modifySortResult.resultCode=='0000'){
            yield put({ type: 'modifySortReducer', payload: { updateInfo: modifySortResult } });
        }else{
          message.error(modifySortResult.msg);
        }
        
    },
  },
  reducers: {
    saveList(state, { payload: { categoryList } }) {
      return {
        ...state,
        ...{categoryList:categoryList},
      }
    },
    getInfoReducer(state, { payload: { categoryInfo } }) {
      return {
        ...state,
        categoryInfo,
      }
    },
    addNewCard(state, { payload: newCard }) {
      const nextCounter = state.counter + 1;
      const newCardWithId = { ...newCard, id: nextCounter };
      const nextData = state.data.concat(newCardWithId);
      return {
        data: nextData,
        counter: nextCounter,
      };
    }
  },
};