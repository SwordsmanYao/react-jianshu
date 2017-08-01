
import {Route} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import SignIn from 'view/user/SignIn.js'
import SignUp from 'view/user/SignUp.js'
import S from './style.scss';

import cfg from 'config/config.json';

export default class Frame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          userinfo:null,
          signinMsg:null
        }
        this.handleSigninAjax = this.handleSigninAjax.bind(this);
    }

    handleSigninAjax(reqData){
      $.post(`${cfg.url}/login`,reqData)
      .done(result=>{
        if(result.code===0){
          this.setState({
            userinfo:result.data
          });
          console.log(result);
        }else if(result.code!==0){

          this.setState({
            signinMsg:result.msg
          });
        }
      });

      // $.ajax({
      //    url:`${cfg.url}/login`,
      //    dataType:'jsonp',
      //    processData: false,
      //    type:'post',
      //    data:reqData,
      //    success:function(data){
      //      alert(data);
      //    },
      //    error:function(XMLHttpRequest, textStatus, errorThrown) {
      //      debugger
      //      alert(XMLHttpRequest.status);
      //      alert(XMLHttpRequest.readyState);
      //      alert(textStatus);
      //    }
      //  });
    }

    render(){

      let {handleSigninAjax} = this;
      let {signinMsg} = this.state;
        return (
            <div className={S.layout}>
                <Nav/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render={
                  props=>(
                    <SignIn
                      {...{
                        handleSigninAjax,
                        signinMsg
                      }}
                    />
                  )
                }/>
                <Route exact path="/sign_up" component={SignUp}/>
            </div>
        );
    }
}
