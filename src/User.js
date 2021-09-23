import { useEffect } from 'react/cjs/react.development';
import {
  getUser,
  useUsersDispatch,
  useUsersState,
} from './UsersContext';

function User({ id }) {
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  // 컴포넌트 첫 렌더링 or [id]가 바뀔 때 요청
  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);

  const { loading, data: user, error } = state.user;

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...!</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email: </b> {user.email}
      </p>
    </div>
  );
}

export default User;
