import { useContext, useEffect, useState } from "react";
import UserContext from '../../Components/Auth/UserContext.js'

import Event from "../../Components/Event/Event.js";
import config from "../../Settings/config.js";
import { request } from "../../Utils.js";

function Home() {
    const user = useContext(UserContext)
    
    const [ events, setEventsState ] = useState([])
    const [ error, setErrorState ] = useState('')

    useEffect(() => {

        request(config.api.get_events, 'POST', {
            num: 10
        }, [
            setErrorState,
            setEventsState
        ], user)
    }, [])

    return (
        <div className="main">
            <p className="color-red">{error}</p>

            <div className="group" style={{width: "100%"}}>
                { events.length ?
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
                    )) : <h1>Пока ещё нет событый.</h1>
                }
            </div>
        </div>
    )
}

export default Home;