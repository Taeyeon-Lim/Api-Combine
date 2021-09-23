import axios from 'axios';
import { useAsync } from 'react-async';

async function getUser({ id }) {
  const reponse = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  return reponse.data;
}

function User({ id }) {
  // useAsync({ 이전 함수와 deps...비슷한 구조 })
  const {
    data: user,
    error,
    isLoading,
  } = useAsync({ promiseFn: getUser, id, watch: id });

  if (isLoading) return <div>loading...</div>;
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
