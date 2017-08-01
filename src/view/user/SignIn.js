
import SignInPanel from 'components/user/SignInPanel';
import EntryPanel from 'components/user/Panel';

let propTypes = {
  handleSigninAjax:PT.func,
  signinMsg:PT.object,
  handleClearMsg:PT.func
}

export default class SignIn extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
      let {handleSigninAjax,signinMsg,handleClearMsg} = this.props;

      return (
          <EntryPanel >
              <SignInPanel {...{handleSigninAjax,signinMsg,handleClearMsg}} />
          </EntryPanel>
      );
    }
}
SignIn.propTypes = propTypes;
