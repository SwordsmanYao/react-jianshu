import AuthorInfo from 'components/myPage/AuthorInfo';
import Aside from 'components/myPage/Aside';
import PreviewList from 'preview/PreviewList';

let propTypes = {
    previewsName:PT.string,
    myPagePreviews:PT.array,
    notebooks:PT.array
}

export default class MyPage extends React.Component{
    constructor(props){
        super(props);
        this.collectionClick = this.collectionClick.bind(this);
    }
    collectionClick(collection_id,collection_name,userInfo){

        let {history,initMyPage} = this.props;

        history.push('/my_page',{userInfo});

        initMyPage(userInfo.user_id,{collection_id},collection_name);
    }
    render(){

        let {previewsName,myPagePreviews,notebooks,location,initMyPage} = this.props;

        let {collectionClick} = this;

        let {userInfo} = location.state;

        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo
                        {...{
                            userInfo
                        }}
                    />
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewsName}
                        </span>
                    </div>
                    <PreviewList
                        {...{
                            previews:myPagePreviews,
                            initMyPage,
                            collectionClick
                        }}
                    />
                </div>
                <div className="four wide column">
                    <Aside
                        {...{
                            notebooks,
                            userInfo
                        }}
                    />
                </div>
            </div>
        )
    }
}

MyPage.propTypes = propTypes;
