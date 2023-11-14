import React, { Component } from 'react';
import Login from '../auth/login';

import loginImage from '../../../static/assets/imagenes/login.jpg';

export default class Auth extends Component{
    constructor(props){
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth() {
        this.props.handleSuccessfulLogin();
        location.assign("/home"); 
    }

    handleUnsuccessfulAuth() {
        this.props.handleUnsuccessfulLogin();
    }

    render() {
        return(
            <div className='auth-wrapper'>
                <div 
                    className='img-login'
                    style={{
                        backgroundImage: `url(${loginImage})`
                    }}
                />

                <div className='login-form'>
                    <Login 
                        handleSuccessfulAuth={this.handleSuccessfulAuth}
                        handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
                    />
                </div>
            </div>
        );
    }
}
