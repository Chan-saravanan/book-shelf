import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getBook, updateBook, clearBook, deleteBook} from '../../actions/index';

class EditBook extends PureComponent
{
    state={
        _id:this.props.match.params.id,
        formData:{
            _id:this.props.match.params.id,
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:'',
            price:''
        }
    }

    handleInput = (event, name)=>{
        const newFormData = {
            ...this.state.formData
        };
        
        newFormData[name]=event.target.value;
        
        this.setState({
            formData : newFormData
        });
    }

    submitForm = (event)=>{
        event.preventDefault();
        // let ownerId = this.props.user.id;
        // let info = {
        //     ownerId,
        //     ...this.state.formData       
        // };
        this.props.dispatch(updateBook(this.state.formData));
    }

    deletePost = (event)=>{
        this.props.dispatch(deleteBook(this.state.formData._id));
    }

    componentDidMount(){
        //console.log("Edit - componentDidMount called!");
        this.props.dispatch(getBook(this.state._id));
    }

    componentDidUpdate(prevProps){
        //console.log("Edit - componentDidUpdate called!");
        //console.log("Edit - componentDidUpdate this.state: ", this.state);
        if(prevProps !== this.props)
        {
            //console.log("Edit - componentDidUpdate this.props: ", this.props);
            //console.log("Edit - componentDidUpdate prevProps: ", prevProps);

            if(this.props.books.book)
            {
                let book = this.props.books.book;

                console.log("book detail for updating the state", book);
                this.setState({
                    formData:{
                        _id:book._id,
                        name:book.name,
                        author:book.author,
                        review:book.review,
                        pages:book.pages,
                        rating:book.rating,
                        price:book.price
                    }
                });
            }
        }
    }

    componentWillUnmount()
    {
        //console.log("Edit - componentWillUnmount called!");
        this.props.dispatch(clearBook());
    }

    redirectUser = ()=>{
        setTimeout(()=>{
            this.props.history.push('/user/user-review');
        },3000)
    }


    render()
    {
        //console.log("Edit - props on render of edit", this.props);
        //console.log("Edit - state on render of edit", this.state);
        return (
            <div className="rl_container article">
                {
                    this.props.books.updateBook?
                        <div className="edit_confirm">
                            post updates, <Link to={`/books/${this.props.books.book._id}`}>Click here to see your post!</Link>
                        </div>
                    :
                        null
                }
                {
                    this.props.books.postDeleted?
                    <div className="red_tag">
                        post deleted!
                        {this.redirectUser()}
                    </div>
                :
                    null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Edit review</h2>
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter name"
                            value={this.state.formData.name}
                            onChange={(event)=>this.handleInput(event,'name')}          
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter author"
                            value={this.state.formData.author}
                            onChange={(event)=>this.handleInput(event,'author')}
                        />
                    </div>
                    <textarea
                        value={this.state.formData.review}
                        onChange={(event)=>this.handleInput(event,'review')}
                    />
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter pages"
                            value={this.state.formData.pages}
                            onChange={(event)=>this.handleInput(event,'pages')}
                        />
                    </div>

                    <div className="form_element">
                        <select
                            value={this.state.formData.rating}
                            onChange={(event)=>this.handleInput(event,'rating')}
                        >
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input 
                            type="number"
                            placeholder="Enter price"
                            value={this.state.formData.price}
                            onChange={(event)=>this.handleInput(event,'price')}
                        />
                    </div>
                    <button type="submit" onClick = {this.submitForm} >Edit Review</button>
                    <div className="delete_post">
                        <div className="button" onClick={this.deletePost}>Delete Review</div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log("Edit - mapStateToProps",state);
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(EditBook);