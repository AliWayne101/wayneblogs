import React, { useState } from 'react'
import Button from '../Button'

interface Props {
    onChange: (value: boolean) => void;
    value: boolean;
}

const Login: React.FC<Props> = ({ onChange, value }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const validateLogin = () => {
        if (username === process.env.NEXT_PUBLIC_ADMIN!) {
            if (password === process.env.NEXT_PUBLIC_PASSWORD!) {
                onChange(true);
                console.log('logged');
            }
        }
    }

    const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        onChange(false);
    }

    const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        onChange(false);
    }

    return (
        <div className="login">
            <input type="text" name="username" id="username" placeholder='Username' onChange={updateUsername} />
            <input type="password" name="password" id="password" placeholder='Password' onChange={updatePassword} />
            <span onClick={validateLogin} className='btn clickable' >Login</span>
        </div>
    )
}

export default Login