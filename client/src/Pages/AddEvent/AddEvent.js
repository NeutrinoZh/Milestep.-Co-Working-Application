import { useContext, useRef, useState } from 'react'
import InputField from '../../Components/Auth/InputField.js'
import config from '../../Settings/config'

import {
    Navigate
} from 'react-router-dom'

import './AddEvent.css'
import { request } from '../../Utils.js'
import UserContext from '../../Components/Auth/UserContext.js'


import Caldendar from '../../Components/Calendar/Calendar.js'

function AddEvent() {
    const title = useRef(null)
    const description = useRef(null)

    const [ error, setErrorState ] = useState('')
    const [ redirect, setRedirectState ] = useState(false)

    const user = useContext(UserContext)

    function submit(event) {
        event.preventDefault()

        request(config.api.add_event, 'POST', {
            title: title.current.value, 
            description: description.current.value
        }, [
            setErrorState,
            setRedirectState
        ], user)
    }

    return  redirect ? <Navigate to={config.urls.profile}/> : (
        <div className="card center card-full" style={{"marginTop": "3%"}}>
            <p className='color-red'>{error}</p>

            <form onSubmit={submit}>
                <InputField
                        name="title"
                        _ref={title}
                        type="text"
                        label={'Title:'}
                    />

                <label forHtml='text'>Description</label>
                <textarea 
                    id="text"
                    name='text'
                    ref={description}
                    className="fright"
                    required
                />

                <Caldendar></Caldendar>

                <button className='btn-submit'>Add Event</button>
            </form>
        </div>
    )
}

export default AddEvent