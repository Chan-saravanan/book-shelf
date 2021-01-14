import React, {Component} from 'react';
import {connect} from 'react-redux';

import {checkAuthentication} from '../actions/index';

export default function AuthentiationHandler(ComposedClass, reload)
{
    class AuthenticationCheck extends Component
    {
        state={
            loading:true,//authentication is in progress!
            isAuthenticated:false
        }

        componentDidMount(){
            //console.log("componentDidMount of AuthenticationCheck!", this.props);
            if(this.state.loading)//If 
            {
                this.props.dispatch(checkAuthentication());
            }
        }

        componentDidUpdate(prevProps, prevState){
            if(this.props !== prevProps)
            {
                this.setState({
                    loading:false
                });
            }
            

            //let user = this.props.user;
            
            //console.log("reload",reload);
            //console.log("componentDidUpdate of AuthenticationCheck!", user);
            
            if(this.props.user && this.props.user.login.isAuth){
                //console.log("User is been authenticated!");
                if(reload === false)
                {
                    this.props.history.push('/user');
                }
            }else{
                //console.log("User has not been authenticated!");
                if(reload){
                    this.props.history.push('/login');
                }
            }
            
        }

        render(){
            if(this.state.loading){
                //console.log("Loading is shown!");
                return <div className="loader">Loading...</div>
            }

            //Authentication is success!
            return (<ComposedClass {...this.props} user={this.props.user.login}/>)
        }
    }   

    function mapStateToProps (state){
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck);
}