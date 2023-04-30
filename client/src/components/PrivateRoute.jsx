import {Route, Navigate } from 'react-router-dom';
export default function PrivateRoute({ component: Component, ...rest }) {
    const isLoggedIn = localStorage.getItem('token');
    return (
        <Route {...rest} render={(props) => isLoggedIn ? (<Component {...props} />) : (<Navigate to={ {pathname: '/'} } />)}/>
    );
}