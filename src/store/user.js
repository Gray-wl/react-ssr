const USER_INFO = 'INDEX/USER_INFO';
const changeUserInfo = data => ({
  type: USER_INFO,
  data
});

export const getUserInfo = server => {
  return (dispatch, getState, $axios) => {
    return $axios.get('/api/user/info').then(res => {
      const { data } = res.data;
      console.log('userInfo:', data);
      dispatch(changeUserInfo(data));
    });
  }
}

const defaultState = {
  userInfo: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case USER_INFO:
      return { ...state, userInfo: action.data };
    default:
      return state;
  }
}
