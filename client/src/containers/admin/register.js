import React,{Component} from 'react';
import {connect} from 'react-redux';

import {getUsers, registerUser} from '../../actions/index';

class Register extends Component
{
    state={
        name:'',
        lastname:'',
        email:'',
        password:'',
        error:'',
        registerationStatus:false
    }

    handleInputEmail = (event)=>{
        this.setState({email:event.target.value})
    }
    handleInputPassword = (event)=>{
        this.setState({password:event.target.value})
    }
    handleInputName = (event)=>{
        this.setState({name:event.target.value})
    }
    handleInputLastName = (event)=>{
        this.setState({lastname:event.target.value})
    }

    componentDidMount()
    {
        this.props.dispatch(getUsers());
    }

    componentDidUpdate(prevProps)
    {
        if(prevProps !== this.props)
        {
            if(this.props.user.registerationStatus === false)
            {
                //Something is went wrong on registeration!
                this.setState({registerationStatus:false, error:'Something have went wrong on registeration!, Try Again!'});
            }
            else
            {
                this.setState({
                    name:'',
                    lastname:'',
                    email:'',
                    password:'',
                    error:'',
                    registerationStatus:false
                })
            }
        }
    }

    submitForm = (event)=>{
        event.preventDefault();
        this.setState({
            error:''
        });

        let userInfo = {
            name:this.state.name,
            lastname:this.state.lastname,
            email:this.state.email,
            password:this.state.password
        }

        //console.log("Register --> userInfo", userInfo);
        this.props.dispatch(registerUser({...userInfo}, this.props.user.users));
    }

    showUsers = (userInfo)=>userInfo?
        userInfo.map((item,index) =>(
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
            </tr>
    )):null;

    render()
    {
        //console.log("Add User's render()", this.props);

        let user = this.props.user.users;

        return (
            <div>
                <form className="rl_container">
                    <h2>Add user</h2>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.handleInputName}/>
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter last name"
                            value={this.state.lastname}
                            onChange={this.handleInputLastName}/>
                    </div>
                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}/>
                    </div>
                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}/>
                    </div>
                    <button type="submit" onClick={this.submitForm}>Add User</button>
                    <div className="error">
                        {
                            this.state.error
                        }
                    </div>
                </form>
                <div className="current_users">
                    <h4>Current Users</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {this.showUsers(user)}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(Register);