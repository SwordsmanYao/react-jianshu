import {Link} from 'react-router-dom';
import cfg from 'config/config.json';

//显示一个作者
export default function Author(props){
    let {user,initMyPage,history} = props;
    let {id:user_id,user_name, avatar,user_intro} = user;

    avatar = cfg.url + avatar;

    return (
        <div className="item">
            <Link
                to="/"
                className="ui mini avatar image"
                onClick={event=>{
                    //阻止默认事件
                    event.stopPropagation();
                    event.preventDefault();
                    //跳转
                    history.push('/my_page',{
                        userInfo:{
                            user_id,
                            user_name,
                            avatar,
                            user_intro
                        }
                    });
                    initMyPage(user_id,{user_id},'所有文章');
                }}
            >
                <img src={avatar} alt=""/>
            </Link>
            <div className="content">
                <div className="header">
                    {user_name}
                </div>
            </div>
        </div>

    );
}
