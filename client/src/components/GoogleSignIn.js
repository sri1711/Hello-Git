import React from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google'
import { GoogleLogin } from 'react-google-login'

const CLIENT_ID = "972097787217-ieg349lso79987fd96uk8odr06onncgk.apps.googleusercontent.com"


function GoogleSignIn() {
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ",res.profileObj);
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res : ",res);
    }

    return(
        <div id="signInButton">
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login"
                scope = 'https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/userinfo.profile'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default GoogleSignIn