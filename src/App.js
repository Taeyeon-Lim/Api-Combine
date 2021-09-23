import Users from './Users';
import { UsersProvider } from './UsersContext';

function App() {
  return (
    // 프로바이더로 감싸기
    <UsersProvider>
      <Users />
    </UsersProvider>
  );
}

export default App;
