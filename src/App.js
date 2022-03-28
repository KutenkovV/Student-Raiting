import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
