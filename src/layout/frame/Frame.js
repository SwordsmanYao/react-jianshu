import Nav from 'nav/Nav';

import S from './style.scss';

export default class Layout extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className={S.layout}>
        <Nav/>
      </div>
    );
  }
}
