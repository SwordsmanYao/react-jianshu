
import {Route,Redirect} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import SignIn from 'view/user/SignIn.js'
import SignUp from 'view/user/SignUp.js'
import S from './style.scss';

import cfg from 'config/config.json';

//整个页面的布局
export default class Frame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          userinfo:null,
          signinMsg:null,
          signupMsg:null,
          hasLoginReq:false
        }
        this.handleSigninAjax = this.handleSigninAjax.bind(this);
        this.handleSignupAjax = this.handleSignupAjax.bind(this);
        this.handleClearMsg = this.handleClearMsg.bind(this);
        this.initUserinfo = this.initUserinfo.bind(this);
        this.logOut = this.logOut.bind(this);

    }
    //初始化登录人信息
    initUserinfo(userinfo){
      if(userinfo){
        userinfo.avatar = cfg.url + userinfo.avatar;
      }
      this.setState({userinfo});
    }
    //ajax发送登录请求
    handleSigninAjax(reqData){
      $.post(`${cfg.url}/login`,reqData)
      .done(result=>{
        if(result.code===0){
            this.initUserinfo(result.data);
        }
        this.setState({
          signinMsg:result
        });
        console.log(result);
      });
    }
    //ajax发送注册请求
    handleSignupAjax(reqData){
      $.post(`${cfg.url}/register`,reqData)
      .done(result=>{

        if(result.code===0){
          this.initUserinfo(result.data);
        }
        this.setState({
          signupMsg:result
        });
        console.log(result);
      });
    }
    //清空返回的信息，主要用于显示错误提示等
    handleClearMsg(){
      this.setState({
        signinMsg:null,
        signupMsg:null
      })
    }

    componentDidMount(){

      //使用cookie重新请求登录人信息，主要在页面刷新时使用
      $.post(`${cfg.url}/autologin`)
      .done(({code,data})=>{
        if(code===0){
          this.initUserinfo(data);
        }
        //在没有返回登录人信息时页面渲染为空白
        this.setState({hasLoginReq:true});
      });
    }
    //注销
    logOut(){
      $.post(`${cfg.url}/logout`)
      .done(({code})=>{
        if(code===0){
          this.initUserinfo(null);
        }
      })
    }

    render(){

      let {handleSigninAjax,handleSignupAjax,handleClearMsg,logOut} = this;
      let {signinMsg,signupMsg,userinfo,hasLoginReq} = this.state;

      //在没有返回登录人信息时页面渲染为空白
      if(!hasLoginReq){
        return (
          <div></div>
        )
      }
        return (
            <div className={S.layout}>
                <Nav
                  {...{
                    userinfo,
                    logOut
                  }}
                />
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render={
                  props=>(
                    userinfo?(
                      <Redirect to="/"/>
                    ):(
                      <SignIn
                        {...{
                          handleSigninAjax,
                          signinMsg,
                          handleClearMsg
                        }}
                      />
                    )

                  )
                }/>
                <Route exact path="/sign_up" render={
                  props=>(
                    userinfo?(
                      <Redirect to="/"/>
                    ):(
                      <SignUp
                        {...{
                          handleSignupAjax,
                          signupMsg,
                          handleClearMsg
                        }}
                      />
                    )

                  )
                }/>
            </div>
        );
    }
}
