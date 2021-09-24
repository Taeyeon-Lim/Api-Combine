import { createContext, useContext, useReducer } from 'react';
import createAsyncDispatcher, {
  createAsyncHandler,
  initialAsyncState,
} from './asyncActionUtils';
// api 파일의 모든 export를 api 객체로 호출
import * as api from './api';

// 초기 상태
const initialState = {
  users: initialAsyncState,
  user: initialAsyncState,
};

const usersHandler = createAsyncHandler('GET_USERS', 'users');
const userHandler = createAsyncHandler('GET_USER', 'user');
// 6가지 액션에 대한 리듀서
function usersReducer(state, action) {
  switch (action.type) {
    // ACTION_1: GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR
    case 'GET_USERS':
    case 'GET_USERS_SUCCESS':
    case 'GET_USERS_ERROR':
      return usersHandler(state, action);
    // ACTION_2: GET_USER, GET_USER_SUCCESS, GET_USER_ERROR
    case 'GET_USER':
    case 'GET_USER_SUCCESS':
    case 'GET_USER_ERROR':
      return userHandler(state, action);
    default:
      throw new Error('Unhandled action type:', action.type);
  }
}

// Context 2개 생성(state, dispatch)
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}

// state, dispatch 사용하기 쉽도록
export function useUsersState() {
  const state = useContext(UsersStateContext);
  if (!state) {
    throw new Error('Cannot find UserProvider');
  }
  return state;
}

export function useUsersDispatch() {
  const dispatch = useContext(UsersDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find UserProvider');
  }
  return dispatch;
}

export const getUsers = createAsyncDispatcher(
  'GET_USERS',
  api.getUsers,
);
export const getUser = createAsyncDispatcher('GET_USER', api.getUser);
