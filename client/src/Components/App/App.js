import '../Auth/Auth.css'
import './App.css'
import './Card.css'

import { 
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'

import React from 'react'

import SignIn from '../Auth/SignIn.js'
import SignUp from '../Auth/SignUp.js'
import Reset from '../Auth/Reset.js'
import NewPassword from '../Auth/NewPassword.js'

import Wrapper from '../Wrapper/Wrapper.js'

import UserContext from '../Auth/UserContext.js'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.setUser = (user) => {
            localStorage['user'] = JSON.stringify(user)
            this.setState(state => ({
                user: user
            }))
        }

        this.state = {
            user: localStorage['user'] ? JSON.parse(localStorage['user']) : { name: '' },
            setUser: this.setUser
        }
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <BrowserRouter>
                    { this.state.user.name != '' ? <Wrapper/> : (
                        <Routes>
                            <Route path="/auth/signin/" element={<SignIn/>}></Route>
                            <Route path="/auth/signup/" element={<SignUp/>}></Route>
                            <Route path="/auth/reset/" element={<Reset/>}></Route>
                            <Route path="/auth/reset-link/:id" element={<NewPassword/>}></Route>
                            <Route path="*" element={<Navigate to="/auth/signin/"/>}></Route>
                        </Routes>
                    )}
                </BrowserRouter>
            </UserContext.Provider>
        );
    }
}

export default App;