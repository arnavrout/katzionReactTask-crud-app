import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import UniversityListing from './components/UniversityListing';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './redux/Store';

function App() {
  return (
    <Provider store={Store}>
    <div className="App">
     <BrowserRouter>
     <div className="header">
      <Link className='menu' to={'/'}>Home</Link>
      <Link className='menu' to={'/universities'}>Universities</Link>
     </div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/universities' element={<UniversityListing></UniversityListing>}></Route>
        <Route path='/users/add' element={<AddUser></AddUser>}></Route>
        <Route path='/users/edit/:code' element={<UpdateUser></UpdateUser>}></Route>
      </Routes>
     </BrowserRouter>
    </div>
    </Provider>
  ); 
}

export default App;
