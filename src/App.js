import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar';

import ListLoad from './Pages/ListLoad';
import Settings from './Pages/Settings'
import Nid from './Pages/Nid'
import Ud from './Pages/Ud'
import Od from './Pages/Od'
import Sd from './Pages/Sd'
import Ktd from './Pages/Ktd'
import Summary from './Pages/Summary'
import SeveralDirectionsList from './Pages/SeveralDirectionsList'
import FinalList from './Pages/FinalList'

function App() {
  return (
    <>
      <div className='aboba'>
        <Router>
          <div className='aboba1'>
            <Navbar />
          </div>
          <div className='aboba2'>
            <Switch>

              {/* Это наш роутинг */}
              <Route path='/listload' exact component={ListLoad} />
              <Route path='/settings' component={Settings} />
              <Route path='/nid' component={Nid} />
              <Route path='/ud' component={Ud} />
              <Route path='/od' component={Od} />
              <Route path='/sd' component={Sd} />
              <Route path='/ktd' component={Ktd} />
              <Route path='/summary' component={Summary} />
              <Route path='/severalDirectionsList' component={SeveralDirectionsList} />
              <Route path='/finalList' component={FinalList} />
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
