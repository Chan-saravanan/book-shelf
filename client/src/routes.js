import React from 'react';
import {Switch, Route} from 'react-router-dom';

//hoc's!
import Layout from './hoc/layout';

//Routes!
import Home from './components/home/home';
import BookView from './components/books/index';
import Login from './containers/admin/login';
import User from './components/admin/index';
import AddReview from './containers/admin/add';
import UserPosts from './components/admin/user_posts';
import EditPosts from './containers/admin/edit';
import Register  from './containers/admin/register';
import Logout from './containers/admin/logout';

//for Authentication cheking!
import Auth from './hoc/auth';

const routes = ()=>{
    return (
       <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null)}/>
                <Route path="/login" exact component={Auth(Login, false)}/>
                <Route path="/user/logout" exact component={Auth(Logout, true)}/>
                <Route path="/books/:id" exact component={Auth(BookView)}/>
                <Route path="/user" exact component={Auth(User, true)}/>
                <Route path="/user/register" exact component={Auth(Register, true)}/>
                <Route path="/user/review/add" exact component={Auth(AddReview, true)}/>
                <Route path="/user/user-review" exact component={Auth(UserPosts, true)}/>
                <Route path="/user/edit-post/:id" exact component={Auth(EditPosts, true)}/>
            </Switch>
        </Layout>
    )
};

export default routes;