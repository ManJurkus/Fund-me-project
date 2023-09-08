import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextWrapper } from "./context/GlobalContext";
import { BasicLayout } from './layout/BasicLayout';
import { Home } from './page/Home';
import { Page404 } from './page/Page404';
import { Register } from './page/Register';
import { Login } from './page/Login';
import { UserLayout } from './layout/UserLayout';
import { Dashboard } from './page/dashboard/Dashboard';
import { Funds } from './page/funds/Funds';
import { AddFund } from './page/funds/AddFund';
import { FundPage } from './components/funds-table/FundPage';


// import { Register } from './pages/Register';
// import { Login } from './pages/Login';
// import { Dashboard } from './pages/Dashboard';
// import { UserLayout } from './layout/UserLayout';
// import { Movies } from './pages/Movies';
// import { UserContextProvider } from './context/UserContext';
// import { UserContextValuesUpdate } from './context/UserContextValuesUpdate';
// import { AddMovie } from './pages/AddMovie';

function App() {
  return (
      <ContextWrapper>
        <BrowserRouter>
          <Routes>
            <Route  Component={BasicLayout} >
              <Route index path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/funds/view/:id' element={<FundPage />} />
            </Route>

            <Route Component={UserLayout} >
            
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/funds' element={<Funds />} />
              <Route path='/funds/new' element={<AddFund />} />
              

              {/* <Route path='/movies' element={<Movies />} />
              <Route path='/movies/add' element={<AddMovie />} /> */}
            </Route>

            <Route Component={BasicLayout}>
            
              <Route path='*' element={<Page404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextWrapper>
  );
}

export default App;