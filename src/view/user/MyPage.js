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
    }

    render(){

        let {previewsName,myPagePreviews,notebooks} = this.props;

        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo/>
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewsName}
                        </span>
                    </div>
                    <PreviewList
                        {...{
                            previews:myPagePreviews,

                        }}
                    />
                </div>
                <div className="four wide column">
                    <Aside
                        {...{
                            notebooks
                        }}
                    />
                </div>
            </div>
        )
    }
}

MyPage.propTypes = propTypes;
