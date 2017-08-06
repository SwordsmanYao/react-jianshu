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
        this.notebookClick = this.notebookClick.bind(this);
    }
    collectionClick(collection_id,collection_name){

        let {history,getPreview,changePreviewsName} = this.props;

        getPreview({collection_id});
        changePreviewsName(collection_name);
    }
    notebookClick(collection_id,collection_name){
        this.collectionClick(collection_id,collection_name);
    }
    render(){

        let {previewsName,myPagePreviews,notebooks,location,initMyPage,myInfo,updateUserIntro} = this.props;

        let {collectionClick,notebookClick} = this;

        let {userInfo} = location.state;

        let isMe = false;

        if(myInfo){
            isMe = userInfo.user_id === myInfo.user_id;
            userInfo = myInfo;
        }

        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo
                        {...{
                            userInfo,
                            initMyPage
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
                            userInfo,
                            notebookClick,
                            isMe,
                            updateUserIntro
                        }}
                    />
                </div>
            </div>
        )
    }
}

MyPage.propTypes = propTypes;
