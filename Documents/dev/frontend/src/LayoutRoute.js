import React, { useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import AppContext from './AppContext';
import NavBar from './NavBar';

const LayoutRoute = (props) => {

    const [globalState, setGlobalState] = useContext(AppContext);

    const handleLogOut = () => {
        localStorage.removeItem('jwt');
        setGlobalState(
            {
                ...globalState,
                loggedIn: false
            }
        )
    }

    return (

        <React.Fragment>
            <NavBar extraComponent={

                globalState.loggedIn ?
                <React.Fragment>
                    <Link to="/profile" className="btn btn-dark">Profile</Link>
                    <button onClick={handleLogOut} 
                    className="btn btn-dark">Logout</button>
                </React.Fragment> :

                <React.Fragment>
                    <Link to="/login" className="btn btn-dark">Login</Link>
                    <Link to="/register" className="btn btn-dark">Register</Link>
                </React.Fragment>

            }>
                <Link to="/" className="btn btn-dark">Home</Link>
                <Link to="/about" className="btn btn-dark">About</Link>
                <Link to="#" className="btn btn-dark">Contact</Link>
            </NavBar>

            <Route path={props.path} exact={props.exact} component={props.component}
            />

            <NavBar/>

        </React.Fragment>
    )
}

export default LayoutRoute