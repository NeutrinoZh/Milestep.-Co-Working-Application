import { useContext, useEffect, useState } from 'react';

import UserContext from '../Auth/UserContext.js'
import { request } from '../../Utils.js'

import config from '../../Settings/config.js';

import './LikeBox.css'

function LikeBox({ like, active, id }) {
    const [ num, setNumState ] = useState(like)
    const [ error, setErrorState ] = useState('')
    const user = useContext(UserContext)

    function onChange(event) {
        let _num = num
        if (event.target.className == "") {
            event.target.className = "like-active"
            _num = num + 1
        } else {
            event.target.className = "";
            _num = num - 1
        }

        setNumState(_num)
        request(config.api.like, 'POST', {
            id: id
        }, [
            setErrorState,
            setNumState
        ], user)
    }

    useEffect(() => {
        console.log(active)
    }, [])

    return (
        <div className='likebox'>
            <p>{error}</p>
            <i>{num} </i>
            <b className={active ? 'like-active' : ''} onClick={onChange}>❤</b>
        </div>
    )
}

export default LikeBox;