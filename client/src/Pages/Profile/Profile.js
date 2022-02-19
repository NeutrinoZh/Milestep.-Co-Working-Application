
import { useContext, useEffect, useRef, useState } from "react";

import {
    Link
} from 'react-router-dom'

import UserContext from "../../Components/Auth/UserContext.js";
import { request } from "../../Utils.js";

import config from "../../Settings/config.js";

import './Profile.css'

import Event from "../../Components/Event/Event.js";

function Profile() {
    const user = useContext(UserContext)

    const [ change_name, setChangeNameState ] = useState(false)
    const [ change_email, setChangeEmailState ] = useState(false)
    const [ change_avatar, setChangeAvatarState ] = useState(false)

    const [ events, setEventsState ] = useState([])
    const [ error, setErrorState ] = useState('')

    const ref_name = useRef(null)
    const ref_email = useRef(null)
    const ref_avatar = useRef(null)

    function ChangeUserName() {
        if (change_name) {
            const name = ref_name.current.value
            const last_name = user.user.name

            if (name.length >= 4) {
                user.setUser({
                    ...user.user,
                    name: name
                })

                request(config.api.change_name, 'POST', {
                    name: ref_name.current.value
                }, [
                    () => { // Callback error
                        user.setUser({
                            ...user.user,
                            name: last_name
                        })
                    },
                    () => {}
                ], user)
            }
        }

        setChangeNameState(true)
    }

    function CancelChangeUserName() {
        setChangeNameState(false)
    }

    function ChangeEmail() {
        if (change_email) {
            const email = ref_email.current.value
            const last_email = user.user.email

            if (email.length >= 5) {
                user.setUser({
                    ...user.user, 
                    email: email
                })
    
                request(config.api.change_email, 'POST', {
                    email: email
                }, [
                    () => { // Callback error
                        user.setUser({
                            ...user.user,
                            email: last_email
                        })
                    },
                    () => {}
                ], user)
            }
        }
    
        setChangeEmailState(true)
    }

    function CancelChangeEmail() {
        setChangeEmailState(false)
    }

    function ChangeAvatar() {
        if (change_avatar) {
            const last_avatar = user.user.avatar

            const formData = new FormData()
            formData.append('avatar', ref_avatar.current.files[0])

            request(config.api.change_avatar, 'POST', formData, [
                () => { // Callback error
                    user.setUser({
                        ...user.user,
                        avatar: last_avatar
                    })
                },
                (response) => {
                    user.setUser({
                        ...user.user,
                        avatar: response.avatar
                    })
                }
            ], user)
        }

        setChangeAvatarState(true)
    }

    function CancelChangeAvatar() {
        setChangeAvatarState(false)
    }

    function ChangePassword() {
        user.setUser({ name: '' })
        document.location.href = config.urls.reset
    }

    useEffect(() => {
        request(config.api.get_events, 'POST', {
            userId: user.id,
        }, [
            setErrorState,
            (res) => {
                console.log(res)
                setEventsState(res)
            }            
        ], user)
    }, []) 

    return (
        <div className="profile">
            <p>{error}</p>

            <p>
                Username: {user.user.name}
                { change_name ? <button onClick={CancelChangeUserName}>Cancel</button> : ""}
                <button onClick={ChangeUserName}>Change Username</button>
                { change_name ? <input ref={ref_name} className="fright"/> : "" }
            </p>

            <p>
                Email: {user.user.email}
                { change_email ? <button onClick={CancelChangeEmail}>Cancel</button> : ""}
                <button onClick={ChangeEmail}>Change Email</button>
                { change_email ? <input ref={ref_email} className="fright"/> : "" }
            </p>
            
            <p>
                <img className="avatar" src={user.user.avatar}></img>    
                { change_avatar ? <button onClick={CancelChangeAvatar} style={{'marginTop': '20px'}}>Cancel</button> : ""}
                <button onClick={ChangeAvatar} style={{'marginTop': '20px'}}>Change Avatar</button>
                { change_avatar ? <input ref={ref_avatar} type="file" className="fright" style={{'marginTop': '20px'}}/> : "" }
            </p>

            <p>
                <button onClick={ChangePassword} className="center">Change Password</button> 
            </p>

            <br/><br/><br/>

            <h3>Interests: {user.user.interests}</h3>
            <h3>Job: {user.user.job}</h3>
            <h3>University degree: {user.user.university}</h3>
            <h3>What they are looking for from the application: {user.user.what_looking}</h3>

            <h1 className="your-events">Your events:</h1>
            
            {
                events.length ?
                    events.map((event, i) => (
                        <Event
                            key={i}
                            title={event.title}
                            description={event.description}
                            num_users={event.num_users}
                            like={event.like}
                            active={event.active}
                            id={event.id}
                        />
                    )) : <h1>Пока у вас ещё нет событый.</h1>
            }

            <Link to={config.urls.add_event}>
                <button className="btn-add-events">Add new Events</button>
            </Link>
        </div>
    )
}

export default Profile;