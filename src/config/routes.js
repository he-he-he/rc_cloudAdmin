import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Redirect} from 'react-router';
import Master from "../pages/master";
import Main from '../pages/main';

const Index = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../pages/exmp/index').default);
  })
}
const Baimap = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../pages/exmp/map').default);
  })
}
const Map2 = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../pages/exmp/map2').default);
  })
}
const Curd = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../pages/exmp/curd').default);
  })
}
const Charts = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../pages/exmp/charts').default);
  })
};
const Login = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../pages/login').default);
  })
};
const NoMatch = () => {
  return (
    <div>404</div>
  )
};
const Error = () => {
  return (
    <div>500</div>
  )
};

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Master}>
        <IndexRoute getComponent={Login} name="首页"/>
        <Route path="exmp" component={Main}>
          <IndexRoute getComponent={Index} name="首页"/>
          <Route path="map" getComponent={Baimap} name="搜索地图"/>
          <Route path="map2" getComponent={Map2} name="概览地图"/>
          <Route path="curd" getComponent={Curd} name="列表"/>
          <Route path="charts" getComponent={Charts} name="图表"/>
        </Route>
        <Route path="login" getComponent={Login}/>
        <Route path="500" getComponent={Error}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Router>
  )
}
export default Routes;
