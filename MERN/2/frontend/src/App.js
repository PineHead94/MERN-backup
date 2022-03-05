import { BrowserRouter as Router, Route } from 'react-router-dom'
import Blogs from './components/Blogs';
import Create from './components/Create';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from "./components/Signup";
// import UserContextProvider from './context/userContext';

function App() {
  return (
    <div className="App">
      {/* <UserContextProvider> */}
      <Router>
        <Route path='/' component={Signup} exact />
        <Route path ='/login' component={Login} />
        <Route path ='/create' component={Create} />
        <Route path='/blogs' component={Blogs} />
        <Logout />
      </Router>
      {/* </UserContextProvider> */}
    </div>
  );
}

export default App;
