//import './App.css';
import Login from './components/Login'
import { useSelector } from 'react-redux';
import { selectUser } from './redux/sliceLogin';
import Dashboard from './components/dashboard';



function App() {
  const user = useSelector(selectUser);

  console.log('redux user Vlaue', user)

  return (
    <div className="App">

      {user ? <Dashboard /> : <Login />}

    </div>
  );
}

export default App;
