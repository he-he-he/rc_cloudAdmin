import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Redirect} from 'react-router';
import Master from "../pages/master";
import Main from '../pages/main';
/*basis部分*/
const Vehicle = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../pages/basis/vehicle').default);
  })
}
/*system部分*/
const Dictionary = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../pages/system/dictionary').default);
  })
}
/*exmp部分*/
const ExmpIndex = (location, cb) => {
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
      <Route path="/" component={Main}>
        <Route path="vehicle" getComponent={Vehicle} name="车辆管理"/>
        <Route path="dicts" getComponent={Dictionary} name="字典管理"/>
        <IndexRoute getComponent={ExmpIndex} name="首页"/>
        <Route path="map" getComponent={Baimap} name="搜索地图"/>
        <Route path="map2" getComponent={Map2} name="概览地图"/>
        <Route path="curd" getComponent={Curd} name="列表"/>
        <Route path="charts" getComponent={Charts} name="图表"/>
      </Route>
      <Route path="login" getComponent={Login}/>
      <Route path="500" getComponent={Error}/>
      <Route path="*" component={NoMatch}/>
    </Router>
  )
}
export default Routes;
