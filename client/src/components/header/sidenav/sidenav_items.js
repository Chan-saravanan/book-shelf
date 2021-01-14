import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from'react-fontawesome';

import {connect} from 'react-redux';

const SideNavItems = (props)=>{
    console.log("Side Nav Items called!", props);
    const items = [
        {
            type:'navItem',
            icon:'home',
            text:' Home',
            link:'/',
            restricted:false
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:' My Profile',
            link:'/user',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:' Add Admins',
            link:'/user/register',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:' Login',
            link:'/login',
            restricted:false,
            exclude:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:' My Review',
            link:'/user/user-review',
            restricted:true,
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:' Add Review',
            link:'/user/review/add',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:' Logout',
            link:'/user/logout',
            restricted:true
        },
    ];

    const element = (item, index)=>( 
        <div key={index} className={item.type}>
            <Link to={item.link}>
                <FontAwesome name={item.icon}>
                    {item.text}
                </FontAwesome>
            </Link>
        </div>
    );

    const showItems = ()=>{
        //console.log("Show Side nav Items called!", items);
        let auth = props.user.login;
        return items.map((item, i)=>{
            if(auth.isAuth){
                return !item.exclude?
                    element(item, i)
                    :
                    null;
            }else{
                return !item.restricted?
                element(item, i)
                :null;
            }
            //element(item, i)
        });
    };

    return (
        <div>
            {props.user.login?showItems():null}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(SideNavItems);