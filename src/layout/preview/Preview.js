
import {Link,withRouter} from 'react-router-dom';
import S from './style.scss';

let propTypes = {
  article_id:PT.number,
  article_title:PT.string,
  previewContent:PT.string,
  user_id:PT.number,
  user_name:PT.string,
  createdAt:PT.string,
  avatar:PT.string,
  user_intro:PT.string
}

//显示一条文章
function Preview(props){

    let {
        article_id,
        article_title,
        previewContent,
        user_id,
        user_name,
        createdAt,
        avatar,
        user_intro,
        initMyPage,
        history
    } = props;

    createdAt = new Date(createdAt).toLocaleString();

    return (
        <div className={`${S.note}`}>
            <div className="ui divider hidden"></div>
            <div className={`${S.content}`}>
                <div className={`${S.author}`}>
                    <Link to="/"
                        className="avatar"
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
                        <img src={avatar} alt="" className="ui avatar image"/>
                    </Link>
                    <div className={`${S.name}`}>
                        <Link to="/">{user_name}</Link>
                        <span className="time">{createdAt}</span>
                    </div>
                </div>
                <Link to="/" className={S.title}>{article_title}</Link>
                <p className={S.abstract}>
                    {previewContent}
                </p>
                <div className={S.meta}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

Preview.propTypes=propTypes;

export default withRouter(Preview);
