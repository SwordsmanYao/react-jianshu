import {BrowserRouter as Router,Route} from 'react-router-dom';

import Frame from 'frame/Frame';

require('semantic/dist/semantic.css');
require('semantic/dist/semantic.js');

$.ajaxSetup({
  xhrFields:{withCredentials:true}//跨域请求是发送cookie认证
});

ReactDOM.render(
    <Router>
      <Route path="/" component={Frame} />
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
