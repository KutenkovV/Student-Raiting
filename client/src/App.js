import "./style/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import ListLoad from "./Pages/ListLoad";
import Settings from "./Pages/Settings";
import Nid from "./Pages/Nid";
import Ud from "./Pages/Ud";
import Od from "./Pages/Od";
import Sd from "./Pages/Sd";
import Ktd from "./Pages/Ktd";
import Summary from "./Pages/Summary";
import Authorization from "./Pages/Authorization";
import SeveralDirectionsList from "./Pages/SeveralDirectionsList";
import FinalList from "./Pages/FinalList";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useToken from "./hooks/useToken";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const { token, setToken } = useToken(); // Хук для работы с токеном
  // там мы его сохроняем и и "получаем"

  // если токена нету, то выводим форм с авторизацией
  if(!token) {
    return (
      <Authorization setToken={setToken} />
    )
  }

  return (
    <>
      <div className="content">
        
        <Router>
          <div className="sidebar">
            <div
              className="burger-btn"
              onClick={() => setMenuActive(!menuActive)}
            >
              <FontAwesomeIcon icon={faBars} size="2x" />
            </div>
            <Navbar active={menuActive} />
          </div>
          <div className="pageContent">
            <Switch>
              {/* Это наш роутинг */}
              <Route path="/listload" exact component={ListLoad} />
              <Route path="/settings" component={Settings} />
              <Route path="/nid" component={Nid} />
              <Route path="/ud" component={Ud} />
              <Route path="/od" component={Od} />
              <Route path="/sd" component={Sd} />
              <Route path="/ktd" component={Ktd} />
              <Route path="/summary" component={Summary} />
              <Route
                path="/severalDirectionsList"
                component={SeveralDirectionsList}
              />
              <Route path="/finalList" component={FinalList} />
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
