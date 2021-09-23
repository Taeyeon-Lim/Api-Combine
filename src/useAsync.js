import { useEffect, useReducer, useCallback } from 'react';

// LOADING, SUCCESS, ERROR 액션 관리
function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// callback = API호출 함수, deps = 값 변화 시, 재 호출
function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  // useCallback으로 1번 생성 이후, 계속 사용
  const fetchData = useCallback(async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  }, [callback]);

  useEffect(() => {
    if (skip) return;
    fetchData();
    // deps 그대로 받아서 사용하기 위해 eslint 1줄 무시
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;
