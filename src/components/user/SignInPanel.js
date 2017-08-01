import React , {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';

import Validation from 'util/validation';

export default class SignInPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
          username:'',
          pwd:'',
          nameErr:false,
          pwdErr:false
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
        this.handleSignin = this.handleSignin.bind(this);
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

      let msg = this.validator.valiOneByValue('pwd',target.value);
      this.setState({
        pwd:target.value,
        pwdErr:msg
      });
    }
    handleSignin(event){

      event.preventDefault();
      event.stopPropagation();

      let {validator} = this;
      let {username,pwd} = this.state;
      let nameErr = validator.valiOneByValue('username',username);
      let pwdErr = validator.valiOneByValue('pwd',pwd);

      if(!nameErr && !pwdErr){
        this.props.handleSigninAjax({
          username:username,
          passw:pwd
        });
      }else{
        this.setState({nameErr,pwdErr});
      }
    }
    render(){
        let {handleChangeUsername,handleChangePwd,handleSignin} = this;
        let {username,pwd,nameErr,pwdErr} = this.state;
        let {signinMsg} = this.props;

        let nameErrMag = nameErr?(
          <p className={S.err}>{nameErr}</p>
        ):null;

        let pwdErrMag = pwdErr?(
          <p className={S.err}>{pwdErr}</p>
        ):null;

        let resInfo = null;
        if(signinMsg){
          resInfo = (
            <div className="ui message error">
              <p>{signinMsg}</p>
            </div>
          );
        }

        return (
            <div className={S.sign_panel}>
                {resInfo}
                <form
                    className="ui form"
                    onSubmit={handleSignin}
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

                    <div className="field">
                        <button type="submit"
                            className="ui button fluid primary"
                        >登录</button>
                    </div>
                </form>
            </div>
        );
    }
}
