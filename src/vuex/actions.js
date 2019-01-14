import request from 'axios';

request.defaults.baseURL = 'https://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600/data/';

export const getUsers = ({ commit, state }) => {
  return request.get('Users').then((response) => {
    if (response.statusText === 'OK') {
      commit('USERS', response.data);
    }
    return state.users;
  }).catch((error) => {
    return { error: error.response.data.message };
  });
};
export const appendUser = (store, user) => {
  return request.post('Users', user).then((response) => {
    if (response.statusText === 'OK') {
      store.commit('USER_APPEND', response.data);
    }
  }).catch((error) => {
    return { error: error.response.data.message };
  });
};
export const updateUser = (store, user) => {
  return request.put(`Users/${user.objectId}`, user).then((response) => {
    if (response.statusText === 'OK') {
      store.commit('USER_UPDATE', response.data);
    }
  }).catch((error) => {
    return { error: error.response.data.message };
  });
};
export const removeUser = (store, objectId) => {
  return request.delete(`Users/${objectId}`).then((response) => {
    if (response.statusText === 'OK') {
      store.commit('USER_REMOVE', objectId);
    }
  }).catch((error) => {
    return { error: error.response.data.message };
  });
};
