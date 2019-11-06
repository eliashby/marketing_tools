import Vue from "vue";
import merge from 'deepmerge';
import _ from "lodash";

export default {
  updateSettings: (state, payload) => {
    Object.keys(payload).forEach((key) => {
      state[key] = merge(state[key], payload[key]);
    });
  },
  updateState: (state, payload) => {
    const newState = _.set(state, payload.parameter, payload.value);
    return Vue.set({}, state, newState);
  },
};
