import { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import UserContext from '../../Components/Auth/UserContext'
import config from '../../Settings/config'
import { request } from '../../Utils'
import './Event.css'

function Event() {
    const { id } = useParams()
    
    const [ event, setEventState ] = useState({})
    
    
    const [ successfull, setSuccessfullState ] = useState(false) 
    const [ error, setErrorState ] = useState('')
    
    const [ join, setJoinState ] = useState(false)

    const [ redirect, setRedirectState ] = useState(false)

    const user = useContext(UserContext)

    useEffect(() => {
        request(`${config.api.get_event}`, 'POST', {
            id: id
        }, [
            setErrorState,
            (res) => {
                console.log(res)
                setJoinState(res.users.indexOf(user.user.email) == -1)
                setEventState(res)
                setSuccessfullState(true)
            }
        ], user)
    }, [])

    function Join() {

        if (!join) {
            setEventState({
                ...event,
                users: [
                    ...event.users,
                    user.user.email
                ]
            })
        } else {
            setEventState({
                ...event,
                users: event.users.filter(email => email != user.email)
            })
        }

        request(`${config.api.join_event}`, 'POST', {
            id: id
        }, [
            setErrorState,
            setEventState
        ], user)

        setJoinState(!join)
    }

    function Delete() {
        request(`${config.api.delete_event}`, 'POST', {
            id: id
        }, [
            () => {},
            () => setRedirectState(true)
        ], user)
    }

    return redirect ? <Navigate to={config.urls.profile}/> : successfull ? (
        <div className="card center card-full event-page">
            <h1>{event.title}</h1>
            <Link to={`${config.urls.author_detail}${event.author_id}`}><h3>Author: {event.author} (link)</h3></Link>
            <p>
                {event.description}
            </p>

            <ol>
                { event.users.map((user, i) => (
                    <li key={i}>{user}</li>
                )) }
            </ol>

            <button onClick={Join}>{ join ? "Join" : "Leave"}</button>
            { user.user.name == event.author ? <button onClick={Delete}>Delete</button> : ''}
        </div>
    ) : error
}

export default Event