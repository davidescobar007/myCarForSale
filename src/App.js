import './App.css';
import NavBar from './components/navBar'
import SearchForm from './components/searchForm'
import AddPost from './components/addPost'
import CarList from './components/carList'
import CarPost from './components/carPost'
import Profile from './components/profile'
import ResultList from './components/resultList';
import ApplicationProvider from './context/contextProvider'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {

  return (
    <div>
      <ApplicationProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <SearchForm />
              <CarList />
            </Route>
            <Route path="/nuevo-registro" exact>
              <AddPost />
            </Route>
            <Route path="/item/:id">
              <CarPost />
            </Route>
            <Route path="/listado-resultados" exact>
              <ResultList />
            </Route>
            <Route path="/-me" exact>
              <Profile
              />
            </Route>
          </Switch>
        </Router>
      </ApplicationProvider>

    </div>
  );
}

export default App;
