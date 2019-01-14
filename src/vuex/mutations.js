export const USERS = (state, users) => {
  state.users = users;
};
export const MODAL_EDIT_STATE = (state, isOpened) => {
  state.isEditOpened = isOpened;
};
export const MODAL_CONFIRM_STATE = (state, isOpened) => {
  state.isConfirmOpened = isOpened;
};
export const USER_EDIT = (state, user) => {
  state.userEdit = user;
};
export const USER_APPEND = (state, user) => {
  state.users.push(user);
};
export const USER_UPDATE = (state, user) => {
  Object.assign(state.users.find((item) => item.objectId === user.objectId), user);
};
export const USER_REMOVE = (state, objectId) => {
  state.users = state.users.filter((user) => {
    return user.objectId !== objectId;
  });
};
