const GET_LIST = 'INDEX/GET_LIST';
const changeList = list => ({
  type: GET_LIST,
  list
});

export const getIndexList = server => {
  return (dispatch, getState, $axios) => {
    return $axios.get('/api/course/list').then(res => {
      const { list } = res.data;
      console.log('list:', list);
      dispatch(changeList(list));
    });
  }
}

const defaultState = {
  list: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      return { ...state, list: action.list };
    default:
      return state;
  }
}
