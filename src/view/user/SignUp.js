
import SignUpPanel from 'components/user/SignUpPanel';
import EntryPanel from 'components/user/Panel';

export default class extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
      let {handleSignupAjax,signupMsg} = this.props;
        return (
            <EntryPanel >
                <SignUpPanel {...{handleSignupAjax,signupMsg}} />
            </EntryPanel>
        );
    }
}
