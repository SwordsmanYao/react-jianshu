import {Link,NavLink} from 'react-router-dom';
import S from './style.scss';

let propTypes = {
    userinfo:PT.object,
    logOut:PT.func
}

//导航
export default function Nav(props){

    let {userinfo,logOut} = props;
    let userLink = null;
    if(userinfo){
        userLink = (
            <NavLink
                to="/my_page"
                className={`${S.avatar} item`}
                activeClassName="active"
            >
                <img
                    src={userinfo.avatar}
                    className="ui image avatar"
                    alt=""
                />
                <div className={S.dropDown}>
                    <p
                        onClick={(event)=>{
                            event.stopPropagation();
                            event.preventDefault();
                            logOut();
                        }}
                    >注销</p>
                </div>
            </NavLink>
        );
    }else{
        userLink =
        [
            (
                <NavLink to="/sign_in"
                className={`item`}
                activeClassName="active"
                key={1}
                >登录</NavLink>
            ),(
                <NavLink to="/sign_up"
                className={`item`}
                activeClassName="active"
                key={2}
                >注册</NavLink>
            )
        ];
    }
    return (
        <div className={`ui fixed secondary pointing menu ${S.nav}`}>
            <div className="ui container">
                <Link to="/"
                className={`header item`}
                >Noods</Link>
                <NavLink exact to="/"
                className={`item`}
                activeClassName="active"
                >首页</NavLink>
                <div className="menu right">
                    {userLink}
                    <NavLink to="/write"
                    className={`item`}
                    activeClassName="active"
                    >写文章</NavLink>
                </div>
            </div>
        </div>
    );
}

Nav.propTypes = propTypes;
