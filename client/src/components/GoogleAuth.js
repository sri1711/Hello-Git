import React from 'react'
import GoogleSignIn from './GoogleSignIn'
import GoogleSignOut from './GoogleSignOut'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Stack } from '@mui/system'
import {gapi} from 'gapi-script'
import { useEffect } from 'react'

const CLIENT_ID = "972097787217-ieg349lso79987fd96uk8odr06onncgk.apps.googleusercontent.com"

function GoogleAuth() {
    useEffect(() => {
        function start() {
          gapi.client.init({
            clientID : CLIENT_ID,
            scope:""
          })
        };
        gapi.load('client:auth2',start);
      });
  return (
    <div>
        <GoogleSignIn/>
        <GoogleSignOut/>
        
    </div>
  )
}

export default GoogleAuth