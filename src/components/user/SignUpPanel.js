import React , {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';

import Validation from 'util/validation';

let propTypes = {
    handleSignupAjax:PT.func,
    signupMsg:PT.object,
    handleClearMsg:PT.func
}
//注册
export default class SignUpPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            username:'',
            pwd:'',
            cfmPwd:'',
            nameErr:false,
            pwdErr:false,
            cfmPwdErr:false
        };

        this.validator = new Validation();

        this.validator.addByValue('username',[
            {strategy:'isEmpty',errorMsg:'用户名不能为空'},
            {strategy:'hasSpace',errorMsg:'用户名不能有空格'},
            {strategy:'maxLength:6',errorMsg:'用户名最长为6'},
        ]);

        this.validator.addByValue('pwd',[
            {strategy:'isEmpty',errorMsg:'密码不能为空'},
            {strategy:'hasSpace',errorMsg:'密码不能有空格'},
            {strategy:'maxLength:6',errorMsg:'密码最长为6'},
        ]);

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePwd = this.handleChangePwd.bind(this);
        this.handleChangeCfmPwd = this.handleChangeCfmPwd.bind(this);
        this.handleSignup = this.handleSignup.bind(this);

    }

    componentWillUnmount(){
        this.props.handleClearMsg();
    }

    handleChangeUsername(event){
        let {target} = event;

        let msg = this.validator.valiOneByValue('username',target.value);

        this.setState({
            username:target.value,
            nameErr:msg
        });
    }

    handleChangePwd(event){
        let {target} = event;
        let{cfmPwdErr} = this.state;

        let msg = this.validator.valiOneByValue('pwd',target.value);
        this.setState({
            pwd:target.value,
            pwdErr:msg
        });

        if(cfmPwdErr){
            this.handleChangeCfmPwd();
        }
    }

    handleChangeCfmPwd(){
        let {passwDom,cfPasswDom} = this.refs;

        this.setState({
            cfmPwd:cfPasswDom.value,
            cfmPwdErr:passwDom.value===cfPasswDom.value?false:'输入与密码不匹配'
        });
    }
    handleSignup(event){

        event.preventDefault();
        event.stopPropagation();

        let {validator} = this;
        let {username,pwd,cfmPwd} = this.state;
        let nameErr = validator.valiOneByValue('username',username);
        let pwdErr = validator.valiOneByValue('pwd',pwd);
        let cfmPwdErr = pwd===cfmPwd?false:'输入与密码不匹配';

        if(!nameErr && !pwdErr && !cfmPwdErr){
            this.props.handleSignupAjax({
                username:username,
                passw:pwd,
                cfPassw:cfmPwd
            });
        }else{
            this.setState({nameErr,pwdErr,cfmPwdErr});
        }
    }
    render(){
        let {handleChangeUsername,handleChangePwd,handleChangeCfmPwd,handleSignup} = this;
        let {username,pwd,cfmPwd,nameErr,pwdErr,cfmPwdErr} = this.state;
        let {signupMsg} = this.props;
        let nameErrMag = nameErr?(
            <p className={S.err}>{nameErr}</p>
        ):null;

        let pwdErrMag = pwdErr?(
            <p className={S.err}>{pwdErr}</p>
        ):null;

        let cfmPwdErrMag = cfmPwdErr?(
            <p className={S.err}>{cfmPwdErr}</p>
        ):null;

        let resInfo = null;
        if(signupMsg){
            if(signupMsg.code===0){
                resInfo = (
                    <div className="ui message positive">
                        <p>{signupMsg.msg}</p>
                    </div>
                );
            }else{
                resInfo = (
                    <div className="ui message error">
                        <p>{signupMsg,msg}</p>
                    </div>
                );
            }
        }

      return (
          <div className={S.sign_panel}>
              {resInfo}
              <form
                  className="ui form"
                  onSubmit={handleSignup}
              >
                  <div className={`field ${nameErr?'error':''}`}>
                      <input
                          type="text"
                          placeholder="用户名"
                          ref="nameDom"
                          value={username}
                          onChange={handleChangeUsername}
                      />
                      {nameErrMag}
                  </div>
                  <div className={`field ${pwdErr?'error':''}`}>
                      <input
                          type="text"
                          placeholder="密码"
                          ref="passwDom"
                          value={pwd}
                          onChange={handleChangePwd}
                      />
                      {pwdErrMag}
                  </div>
                  <div className={`field ${cfmPwdErr?'error':''}`}>
                      <input
                          type="text"
                          placeholder="确认密码"
                          ref="cfPasswDom"
                          value={cfmPwd}
                          onChange={handleChangeCfmPwd}
                      />
                      {cfmPwdErrMag}
                  </div>
                  <div className="field">
                      <button type="submit"
                          className="ui button fluid primary"
                      >注册</button>
                  </div>
              </form>
          </div>
      );
    }
}

SignUpPanel.propTypes = propTypes;
