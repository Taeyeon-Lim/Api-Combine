import { useState } from 'react';
import User from './User';
import {
  getUsers,
  useUsersDispatch,
  useUsersState,
} from './UsersContext';

function Users() {
  const [userId, setUserId] = useState(null);
  // Context 불러오기
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  // reload 버튼 onClick
  const fetchData = () => {
    getUsers(dispatch);
  };

  const { loading, data: users, error } = state.users;
  // 로딩-에러-users유무 확인
  if (loading) return <div>loading...</div>;
  if (error) return <div>Error...!</div>;
  if (!users) return <button onClick={fetchData}>reload</button>;

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
      <button onClick={fetchData}>API 재호출</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
