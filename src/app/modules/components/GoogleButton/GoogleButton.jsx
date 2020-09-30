import React from 'react'
import config from './../../../config/config';

const GoogleButton = ({ text, onSuccessAction, onFailureAction }) => {

    React.useEffect(() => {

        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                client_id: config.google.client_id
            });
            console.log('API Initied');

            window.gapi.load('singin2', () => {
                const params = {
                    onSuccess: onSuccessAction,
                    onFailure: onFailureAction
                }
                window.gapi.singin2.render('g-signin2', params)
            })
        })

    }, [])

    return (
        <div className="g-signin2" data-onsuccess="onSignIn">{text}</div>
    )
}

export default GoogleButton;
