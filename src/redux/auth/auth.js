import BookmanAPI from '../../api/bookmanAPI';

// actions
const CREATE_STORE = 'CREATE_STORE';
const LOGIN_STORE = 'LOGIN_STORE';
const AUTH_STORE = 'AUTH_STORE';
const CATCH_ERROR = 'CATCH_ERROR';

// reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case CREATE_STORE:
      return action.message;

    case LOGIN_STORE:
      return action.user;

    case AUTH_STORE:
      return action.token;

    case CATCH_ERROR:
      return action.error;

    default:
      return state;
  }
}

// action creators
export function registerStore(storeInfo) {
  return (dispatch) =>
    BookmanAPI.createStore(storeInfo).then((data) => {
      if (data) {
        dispatch({
          type: CREATE_STORE,
          message: data,
        });
      }
    });
}

export function loginStore(storeInfo) {
  return (dispatch) =>
    BookmanAPI.loginStore(storeInfo)
      .then((data) => {
        if (data) {
          dispatch({
            type: LOGIN_STORE,
            user: data,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: CATCH_ERROR,
          error: { error: e },
        });
      });
}

export function authRequests() {
  return (dispatch) =>
    BookmanAPI.getToken().then((data) => {
      if (data) {
        dispatch({
          type: LOGIN_STORE,
          token: data,
        });
      }
    });
}
