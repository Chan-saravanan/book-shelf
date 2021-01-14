import React,{Component} from 'react';

import {connect} from 'react-redux';
import {getUserPosts} from '../../actions/index';
import moment from 'moment-js';
import {Link} from 'react-router-dom';

class UserPosts extends Component{
    state={
        userReviews:[]
    }
    componentDidMount(){
        this.props.dispatch(getUserPosts(this.props.user.login.id));
    }

    componentDidUpdate(prevProps, prevState)
    {
        //console.log("componentDidUpdate", this.props);
        if(this.props !== prevProps)
        {
            this.setState({
                userReviews:this.props.user.userPosts
            });
        }
    }

    showUserPosts = ()=>{
        let reviews = this.state.userReviews;
        return reviews.length>0?
            reviews.map(item=>(
                <tr key={item._id}>
                    <td><Link to={`/user/edit-post/${item._id}`}>{item.name}</Link></td>
                    <td>{item.author}</td>
                    <td>{moment(item.createdAt).format('MM/DD/YY')}</td>
                </tr>)
            )
        :
            null;
    }

    render()
    {
        //console.log("User Posts", this.props);
        return (
            <div className="user_posts">
                <h4>Your Reviews:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserPosts()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserPosts);