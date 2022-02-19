import {
    useState,
    useRef,
} from 'react'

import {
    Link,
    useParams,
    Navigate
} from "react-router-dom";

import InputField from './InputField.js';

import { loc } from '../../Settings/localization.js'
import config from '../../Settings/config.js';

// New password setting page
function NewPassword() {
    const password = useRef(null)
    const repassword = useRef(null)

    const [ error, setErrorState ] = useState('')
    const [ redirect, setRedirectState ] = useState(false)
    
    const { id } = useParams()

    function submit(event) {
        event.preventDefault()

        fetch(`${config.server}${config.api.new_password}${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password.current.value,
                repassword: repassword.current.value
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
                <h1 className="text-center">{ loc.new_password }</h1>
                <h6 className="text-center color-red">{ loc[error] ? loc[error] : error }</h6>

                <form className="auth-form" method="POST" onSubmit={submit}>
                    <InputField
                        name="password"
                        _ref={password}
                        type="password"
                        label={loc.new_password + ':'}
                    />
                    <InputField
                        name="repassword"
                        _ref={repassword}
                        type="password"
                        label={loc.repassword + ':'}
                    />

                    <input className="auth-btn" type="submit" value={loc.send}></input>

                    <Link to={`${config.urls.signin}`}>
                        <input className="auth-btn" type="button" value={loc.cancel}></input>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default NewPassword