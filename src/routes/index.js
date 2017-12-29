import React from 'react';
import { BrowserRouter , HashRouter, Route , Redirect, Switch, StaticRouter} from 'react-router-dom';
import Bundle from '../components/Bundle.js'
import Home from '../components/Home.js'
import Hello from 'bundle-loader?lazy&name=Hello!../components/Hello.js';
import initialState from '../redux/store/data';

const hello = (props) => (
  <Bundle load={Hello}>
    {(Component) => <Component {...props}/>}
  </Bundle>
)

let router = (
    <HashRouter context={initialState} basename='/'>
        <div>
            <Switch>
                <Route path="/index"  exact  component={Home} />
                <Route path="/hello"  component={hello} />
                <Redirect from="/" to="/index" />
            </Switch>
        </div>
    </HashRouter>
)

export default router;
