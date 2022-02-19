import {
    useState,
    useRef,
} from 'react'

import {
    Link,
    Navigate
} from "react-router-dom";

import InputField from './InputField.js';

import { loc } from '../../Settings/localization.js'
import config from '../../Settings/config.js'

// Registration page
function SignUp() {
    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const repassword = useRef(null)

    const interests = useRef(null)
    const job = useRef(null)
    const university = useRef(null)
    const what_looking = useRef(null)

    const [ error, setErrorState ] = useState('')
    const [ redirect, setRedirectState ] = useState(false)
    
    function submit(event) {
        event.preventDefault()

        fetch(`${config.server}${config.api.signup}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                repassword: repassword.current.value,
                interests: interests.current.value,
                job: job.current.value,
                university: university.current.value,
                what_looking: what_looking.current.value
            })
        }).then((res) => {
            if (res.ok) {
                res.json().then((response) => {
                    if (response.error) {
                        setErrorState(response.error)
                    } else {
                        setRedirectState(true)
                    }
                })
            } else {
                setErrorState(res.statusText);
            }
        })
    }

    return redirect ? <Navigate to={config.urls.signin}></Navigate> : (
        <div className="auth-page">
            <div className="auth-block">
                <h1 className="text-center">{ loc.signup_title }</h1>
                <h6 className="text-center color-red">{ loc[error] ? loc[error] : error }</h6>

                <form className="auth-form" method="POST" onSubmit={submit}>
                    <InputField
                        name="name"
                        _ref={name}
                        type="name"
                        label={loc.name + ':'}
                    />
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
                    <InputField
                        name="repassword"
                        _ref={repassword}
                        type="password"
                        label={loc.repassword + ':'}
                    />
                    <InputField
                        name="interests"
                        _ref={interests}
                        type="text"
                        label='interests:'
                    />
                     <InputField
                        name="job"
                        _ref={job}
                        type="text"
                        label='job:'
                    />
                     <InputField
                        name="university"
                        _ref={university}
                        type="text"
                        label='university:'
                    />
                    <InputField
                        name="what_looking"
                        _ref={what_looking}
                        type="text"
                        label='what looking:'
                    />

                    <input className="auth-btn" type="submit" value={loc.signup}></input>

                    <Link to={`${config.urls.signin}`}>
                        <input className="auth-btn" type="button" value={loc.signin}></input>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default SignUp