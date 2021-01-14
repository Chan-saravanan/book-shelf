import React,{Component} from 'react';
import {connect} from 'react-redux';

//For handking the reducers!
import {getBooks} from '../actions/index';

//For handling the child items on the screen!
import BookItem from '../widgetsUI/book_item';

class HomeContainer extends Component
{
    componentDidMount(){
        this.props.dispatch(getBooks(1, 0, 'desc'));
    }

    renderBookItems = (books)=>{
        return books.list ?
            books.list.map((item, key) =>(<BookItem key={key} {...item}/>))
        :   
            null;
    }

    loadMore = ()=>{
        let count = this.props.books.list.length;
        this.props.dispatch(getBooks(1, count, 'desc', this.props.books.list));
    }

    render()
    {

        return(
            <div>
                {this.renderBookItems(this.props.books)}
                <div className="loadmore" onClick={this.loadMore}>Load More</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //The "book" should be same name as the reducer name at the reducer's index.js!
        books:state.books
    }
}



export default connect(mapStateToProps)(HomeContainer);