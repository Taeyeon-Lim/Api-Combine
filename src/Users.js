import { useEffect, useReducer } from 'react';
import axios from 'axios';

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

function Users() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });
  const fetchUsers = async () => {
    dispatch({ type: 'LOADING' });
    // 예외처리(try-catch)
    try {
      // 비동기 처리
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      dispatch({ type: 'SUCCESS', data: response.data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  // 컴포넌트 첫 렌더링 시 수행 = ,[])
  useEffect(() => {
    fetchUsers();
  }, []);

  // 로딩-에러-users유무 확인
  const { loading, data: users, error } = state;
  if (loading) return <div>loading...</div>;
  if (error) return <div>Error...!</div>;
  if (!users) return null;

  // users 데이터 존재
  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>API 재호출</button>
    </>
  );
}

export default Users;
