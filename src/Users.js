import axios from 'axios';
import { useState } from 'react';
import { useAsync } from 'react-async';
import User from './User';

async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(null);
  // reload = 이전의 refetch
  const {
    data: users,
    error,
    isLoading,
    reload,
    run,
  } = useAsync({
    // promiseFn: getUsers
    // 버튼 클릭 시, 데이터 호출(deferFn)
    deferFn: getUsers,
  });

  // 로딩-에러-users유무 확인
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>Error...!</div>;
  if (!users) return <button onClick={run}>reload</button>;

  // users 데이터 존재
  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={reload}>API 재호출</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
