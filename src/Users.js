import axios from 'axios';
import useAsync from './useAsync';

async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );
  return response.data;
}

function Users() {
  // Hook, useAsync(callback, deps 기본값=[] "생략 가능", 컴포넌트 첫 렌더링 요청 생략)
  const [state, refetch] = useAsync(getUsers, [], true);
  // 로딩-에러-users유무 확인
  const { loading, data: users, error } = state;
  if (loading) return <div>loading...</div>;
  if (error) return <div>Error...!</div>;
  if (!users) return <button onClick={refetch}>reload</button>;

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
      <button onClick={refetch}>API 재호출</button>
    </>
  );
}

export default Users;
