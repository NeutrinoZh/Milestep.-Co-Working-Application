import {
    useState,
    useRef,
    useContext
} from 'react'

import {
    Link,
} from "react-router-dom";

import InputField from './InputField.js'
import UserContext from './UserContext.js'

import config from '../../Settings/config.js'
import { loc } from '../../Settings/localization.js'

// Authorization. (email, password)
export function SignIn() {
    const email = useRef(null)
    const password = useRef(null)

    const user = useContext(UserContext)
    const [ error, setErrorState ] = useState('')

    function submit(event) {
        event.preventDefault()

        fetch(`${config.server}${config.api.signin}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.current.value,
                password: password.current.value
            })
        }).then((res) => {
            if (res.ok) {
                res.json().then((response) => {
                    if (response.error) {
                        setErrorState(response.error)
                    } else {
                        user.setUser(response);
                    }
                })
            } else {
                setErrorState(res.statusText);
            }
        })
    }

    return (
        <div className="auth-page">
            <div className="auth-block">
                <h1 className="text-center">{ loc.signin_title }</h1>
                <h6 className="text-center color-red">{ loc[error] ? loc[error] : error }</h6>

                <form className="auth-form" method="POST" onSubmit={submit}>
                    <InputField
                        name="email"
                        _ref={email}
                        type="email"
                        label={loc.email + ':'}
                    />
                    <InputField
                        name="password"
                        _ref={password}
                        type="password"
                        label={loc.password + ':'}
                    />

                    <input className="auth-btn" type="submit" value={loc.signin}></input>

                    <Link to={`${config.urls.signup}`}>
                        <input className="auth-btn" type="button" value={loc.signup}></input>
                    </Link>
                    
                    <Link to={`${config.urls.reset}`}>
                        <p className="text-center auth-forgot">{loc.forgot_password}</p>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default SignIn