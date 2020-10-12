import React, { useState, useMemo } from 'react';
import { HashRouter, Switch, Route } from  "react-router-dom";
import Footer from './components/Footer';
import NavHeader from './components/NavHeader';
import HomePage from './components/HomePage';
import Authentication from './components/Authentication';
import Register from './components/Register';
import FAQ from './components/FAQ';
import Menu from './components/Menu';
import About from './components/About';
import Contact from './components/Contact';
import Logout from './components/Logout.js';
import GDPR from './components/GDRP.js';
import { UserContext } from './components/UserContext';
import Review from './components/Review';
import EditQuestion from  './components/EditQuestion';
import ScrollIntoView from './components/ScrollToTop';

import './App.scss';


function App() {

  const [user, setUser] = useState(null);

  const value = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <div className="App">
      <HashRouter basename="/">
      <UserContext.Provider value={value}>
      <ScrollIntoView>
      <NavHeader />
        <Switch>
          <Route exact path={"/"} component={HomePage} />
          <Route path={"/logout"} component={Logout}/>
          <Route path={"/login"} component={Authentication}/>
          <Route path={"/register"} component={Register}/>
          <Route exact path={"/faq"} component={FAQ}/>
          <Route exact path={"/faq/:id"} component={EditQuestion}/>
          <Route path={"/menu"} component={Menu}/>
          <Route path={"/about"} component={About}/>
          <Route path={"/contact"} component={Contact}/>
          <Route path={"/gdpr"} component={GDPR}/>
          <Route path={"/review"} component={Review}/>
        </Switch>
      <Footer />
      </ScrollIntoView>
      </UserContext.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
