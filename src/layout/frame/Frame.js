
import {Route,Redirect} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home';
import SignIn from 'view/user/SignIn'
import SignUp from 'view/user/SignUp'
import MyPage from 'view/user/MyPage';
import Write from 'view/write/Write';
import LoginHint from 'layout/LoginHint';

import S from './style.scss';

import cfg from 'config/config.json';

//整个页面的布局
export default class Frame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userInfo:null,
            signinMsg:null,
            signupMsg:null,
            hasLoginReq:false,
            myPagePreviews:[],
            notebooks:[],
            previewsName:'所有文章'
        }
        this.handleSigninAjax = this.handleSigninAjax.bind(this);
        this.handleSignupAjax = this.handleSignupAjax.bind(this);
        this.handleClearMsg = this.handleClearMsg.bind(this);
        this.inituserInfo = this.inituserInfo.bind(this);
        this.logOut = this.logOut.bind(this);
        this.getPreview = this.getPreview.bind(this);
        this.initMyPage = this.initMyPage.bind(this);
        this.changePreviewsName = this.changePreviewsName.bind(this);
        this.updateUserIntro = this.updateUserIntro.bind(this);

    }
    //初始化登录人信息
    inituserInfo(userInfo){

        if(userInfo){
            let {id,avatar,username,user_intro} = userInfo;

            avatar = cfg.url + avatar;

            userInfo={
                user_id:id,
                avatar,
                user_name:username,
                user_intro
            }
        }

        this.setState({
            userInfo:userInfo
        });


    }
    //ajax发送登录请求
    handleSigninAjax(reqData){
        $.post(`${cfg.url}/login`,reqData)
        .done(result=>{
            if(result.code===0){
                this.inituserInfo(result.data);
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
                this.inituserInfo(result.data);
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
                this.inituserInfo(data);
            }
            //在没有返回登录人信息时页面渲染为空白
            this.setState({hasLoginReq:true});
        });

        //当重新刷新页面时从location中取得用户id重新加载
        let {state,pathname} = this.props.location;

        if(state){
            let {user_id,collection_id,collection_name} = state.userInfo;

            if(pathname==='/my_page'){
                if(collection_id){
                    this.initMyPage(user_id,{collection_id},collection_name);
                }else{
                    this.initMyPage(user_id,{user_id},'所有文章');
                }
            }
        }
    }
    //注销
    logOut(){
        $.post(`${cfg.url}/logout`)
        .done(({code})=>{
            if(code===0){
                this.inituserInfo(null);
            }
        })
    }

    getPreview(data){
        $.post(`${cfg.url}/getPreview`,data)
        .done(({code,data})=>{
            if(code===0){
                this.setState({
                    myPagePreviews:data
                });
            }
        });
    }
    //previewName   列表上显示的分类名字
    initMyPage(user_id,previewsData,previewsName){

        this.getPreview(previewsData);

        //获取我的文集列表数据
        $.post(`${cfg.url}/getCollection`,{
            user_id
        })
        .done(({code,data})=>{

            if(code===0){
                this.setState({
                    notebooks:data,
                    previewsName
                });
            }
        })
    }
    changePreviewsName(previewsName){
        this.setState({previewsName});
    }
    updateUserIntro(intro){
        let{userInfo} = this.state;

        userInfo.user_intro = intro;

        this.setState({userInfo});

    }
    render(){

        let {handleSigninAjax,handleSignupAjax,handleClearMsg,logOut,initMyPage,getPreview,changePreviewsName,updateUserIntro} = this;
        let {signinMsg,signupMsg,userInfo,hasLoginReq,myPagePreviews,notebooks,previewsName} = this.state;
        let {history} = this.props;
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
                        userInfo,
                        logOut,
                        history,
                        initMyPage
                    }}
                />
                <Route exact path="/" render={
                    (props)=>(
                        <Home
                            {...{
                                initMyPage
                            }}
                            {...props}
                        />
                    )
                }/>
                <Route exact path="/sign_in" render={
                    props=>(
                        userInfo?(
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
                        userInfo?(
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
                <Route exact path="/my_page" render={
                    props=>(
                        props.location.state?(
                            <MyPage
                                {...{
                                    myPagePreviews,
                                    notebooks,
                                    previewsName,
                                    initMyPage,
                                    getPreview,
                                    changePreviewsName,
                                    myInfo:userInfo,
                                    updateUserIntro
                                }}
                                {...props}
                            />
                        ):(
                            <Redirect to="/"/>
                        )

                    )
                }/>
                <Route path="/write" render={
                    (props)=>(
                        userInfo?(
                            <Write
                                {...{
                                    userInfo
                                }}
                            />
                        ):(
                            <Redirect to="/login_hint"/>
                        )

                    )
                }/>

                <Route path="/login_hint" component={LoginHint}/>
            </div>
        );
    }
}
