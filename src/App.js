import React, {useState} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Header from './Components/Header/Header';
import Auth from './Components/Auth/Auth';
import Layout from './Components/Layout/Layout';
import AddPlayer from './Components/AddPlayer/AddPlayer';
import ViewPlayer from './Components/ViewPlayers/ViewPlayers';
import UpdatePlayer from './Components/UpdatePlayer/UpdatePlayer';
import LogOut from './Components/Auth/Logout/Logout';

import AuthContext from './Components/auth-context';
import ProfileContext from './Components/profile-context';
import ValidContext from './Components/valid-context';


const app = props => {
  const [authStatus, setStatus] = useState(false);
  const [profileStatus, setProfileStatus] = useState({});
  const [validStatus, setValidStatus] = useState(null);

  const setAuth = (stat) =>{
    console.log('stat', stat)
    setStatus(stat);
   }

   const updateProfileStatus = (data) =>{
     setProfileStatus(data)
   }

   const updateValidStatus = (token) =>{
    setValidStatus(token)
  }

   let routes = (
    <Switch>
     <Route path="/" exact component={Auth} />
     <Route path="/viewPlayer" component={ViewPlayer}/>
     <Route path="/addPlayer" component={AddPlayer}/>
     <Route path="/updatePlayer" component={UpdatePlayer}/>
     <Route path="/logout" component={LogOut}/>
     <Redirect to="/" /> 
    </Switch>
  );
  if (AuthContext.status ) {
    routes = (
      <Switch>
        <Route path="/updatePlayer" component={UpdatePlayer}/>
        <Route path="/viewPlayer" component={ViewPlayer}/>
        <Route path="/addPlayer" component={AddPlayer}/>
        <Route path="/logout" component={LogOut}/>
        <Route path="/" exact component={Auth} />
        <Redirect to="/" /> 
      </Switch>
    );
  }

    return (
      <div className="App">
        <AuthContext.Provider value={{status: authStatus, login: setAuth}}>
        <ProfileContext.Provider value={{profile: profileStatus, profileStat: updateProfileStatus}}>
        <ValidContext.Provider value={{valid: validStatus, validStat: updateValidStatus}}>
          <Header/>
          <Layout>
            {routes}
          </Layout>
        </ValidContext.Provider>
        </ProfileContext.Provider>  
        </AuthContext.Provider>
      </div>
    );
};

export default withRouter(app);
