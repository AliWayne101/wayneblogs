import React from 'react'
import Button from '../Button'

const Login = () => {
    return (
        <div className="login">
            <input type="text" name="username" id="username" placeholder='Username' />
            <input type="password" name="password" id="password" placeholder='Password' />
            <Button text={'Login'} link={''} />
        </div>
    )
}

export default Login