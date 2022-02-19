import {
    Link
} from 'react-router-dom'

import config from '../../Settings/config'
import './Event.css'

import LikeBox from '../LikeBox/LikeBox.js'

const Event = ({ title, description, num_users, like, active, id }) => (
    <div className="card card-inline center event">
        <LikeBox like={like} active={active} id={id}/>

        <h1>{title}</h1>
        <p>
            {description}
        </p>
        <p className="num-user">Users: {num_users}</p>
        
        <Link to={`${config.urls.event_detail}${id}`}>
            <button>Detail</button>
        </Link>
    </div>
)

export default Event