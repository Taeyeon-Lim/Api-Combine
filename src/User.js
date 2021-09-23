import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
  const reponse = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  return reponse.data;
}

function User({ id }) {
  // refatch 필요없음, [id]:아이디 값 변경 시 호출
  const [state] = useAsync(() => getUser(id), [id]);
  const { loading, data: user, error } = state;

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
