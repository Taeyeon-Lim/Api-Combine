import { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 컴포넌트 첫 렌더링 시 수행 = ,[])
  useEffect(() => {
    const fetchUsers = async () => {
      // 예외처리(try-catch)
      try {
        // 초기화
        setUsers(null);
        setError(null);
        setLoading(true);
        // 비동기 처리
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        );
        setUsers(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // 로딩-에러-users유무 확인
  if (loading) return <div>loading...</div>;
  if (error) return <div>Error...!</div>;
  if (!users) return null;

  // users 데이터 존재
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.username} ({user.name})
        </li>
      ))}
    </ul>
  );
}

export default Users;
