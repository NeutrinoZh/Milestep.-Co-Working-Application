import {
    useState,
    useRef,
} from 'react'

import {
    Link,
} from "react-router-dom";

import InputField from './InputField.js';

import { loc } from '../../Settings/localization.js'
import config from '../../Settings/config.js';

// Password reset page
function Reset() {
    const email = useRef(null)

    const [ error, setErrorState ] = useState('')
    const [ success, setSucessState ] = useState(false)
    
    function submit(event) {
        event.preventDefault()

        fetch(`${config.server}${config.api.reset}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.current.value,
            })
        }).then((res) => {
            if (res.ok) {
                res.json().then((response) => {
                    if (response.error) {
                        setErrorState(response.error)
                    } else {
                        setSucessState(true)
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
                <h1 className="text-center">{ loc.reset_title }</h1>
                <h6 className="text-center color-red">{ loc[error] ? loc[error] : error }</h6>
                <h6 className="text-center color-green">{ success ? loc.success_send_reset : '' }</h6>

                <form className="auth-form" method="POST" onSubmit={submit}>
                    <InputField
                        name="email"
                        _ref={email}
                        type="email"
                        label={loc.email + ':'}
                    />

                    <input className="auth-btn" type="submit" value={loc.send}></input>

                    <Link to={`${config.urls.signin}`}>
                        <input className="auth-btn" type="button" value={loc.signin}></input>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Reset