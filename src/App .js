import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit'

function App() {
  return (
    <Router>
      <Switch >
        <Route path='/create-task'>
          <Create/>
        </Route>
        <Route path='/edit-task/:id'>
          <Edit/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
