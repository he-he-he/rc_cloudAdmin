import React from 'react';
import { browserHistory, Router, Route, IndexRoute} from 'react-router';
import Main from '../pages/main';

const Index = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../pages/index').default)
  })
}
const Baimap = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../pages/map').default)
  })
}
const Map2 = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../pages/map2').default)
  })
}
const Curd = (location, cb) => {
  console.log(Location)
  require.ensure([], require => {
    cb(null, require('../pages/curd').default)
  })
}
const ChartsPage = (location, cb) => {
  console.log(Location)
  require.ensure([], require => {
    cb(null, require('../pages/charts').default)
  })
}
const NoMatch = () => {
  return (
    <div>404</div>
  )
}


const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route  path="/" component={Main}>
        <Route path="index" getComponent={Index} name="首页"/>
        <Route path="map" getComponent={Baimap} name="地图"/>
        <Route path="map2" getComponent={Map2} name="地图2"/>
        <Route path="curd" getComponent={Curd} name="列表"/>
        <Route path="charts" getComponent={ChartsPage} name="列表"/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Router>
  )
}
export default Routes;
