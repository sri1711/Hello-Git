import React from 'react'
// import {googleLogout as GoogleLogout} from '@react-oauth/google'
import { GoogleLogout } from 'react-google-login';

const CLIENT_ID = "972097787217-ieg349lso79987fd96uk8odr06onncgk.apps.googleusercontent.com"
function GoogleSignOut() {
    const onSuccess = () => {
        console.log("Log out successfull!");
    }
    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={CLIENT_ID}
                buttonText={"LogOut"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default GoogleSignOut