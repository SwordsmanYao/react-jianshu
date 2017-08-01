
import SignUpPanel from 'components/user/SignUpPanel';
import EntryPanel from 'components/user/Panel';

let propTypes = {
  handleSignupAjax:PT.func,
  signupMsg:PT.object,
  handleClearMsg:PT.func
}

export default class SignUp extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
      let {handleSignupAjax,signupMsg,handleClearMsg} = this.props;
        return (
            <EntryPanel >
                <SignUpPanel {...{handleSignupAjax,signupMsg,handleClearMsg}} />
            </EntryPanel>
        );
    }
}

SignUp.propTypes = propTypes;
