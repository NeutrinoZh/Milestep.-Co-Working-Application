import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserContext from "../../Components/Auth/UserContext"
import config from "../../Settings/config"
import { request } from "../../Utils"
import Event from "../Event/Event"


function OtherProfile() {
    
    const my_user = useContext(UserContext)
    
    const [ user, setUserState ] = useState({})
    const [ error, setErrorState ] = useState('')

    const [ events, setEventsState ] = useState([])

    const { id } = useParams()

    useEffect(() => {
        request(config.api.get_user, 'POST', {
            id: id
        }, [
            setErrorState,
            setUserState
        ], my_user)

        request(config.api.get_events, 'POST', {
            userId: user.id
        }, [
            setErrorState,
            setEventsState
        ], my_user)
    }, [])

    return (
        <div>
            <p>{error}</p>

            <p>Username: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Avatar: <img className="avatar" src={user.avatar}></img></p>

            <h3>Interests: {user.interests}</h3>
            <h3>Job: {user.job}</h3>
            <h3>University degree: {user.university}</h3>
            <h3>What they are looking for from the application: {user.what_looking}</h3>


            <h1 className="your-events">His(Her) events:</h1>
            
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
                    )) : <h1>Пока у этого пользователя нет событый.</h1>
            }
        </div>
    )
}

export default OtherProfile