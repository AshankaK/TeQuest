import React, { useState, useContext } from 'react';
import AppContext from './AppContext';

const ProfileScreen = () => {

    const[globalState, setGlobalState] = useContext(AppContext);

    const [ state, setState ] = useState(
        {
            showErrors: false,
            loading: false,
            updateSuccess: false
        }
    )
    
    const formData = new FormData();
    
    // Undefined only before return
    let firstNameField;
    let lastNameField;
    let emailField;
    let passwordField;
    let phoneField;
    let photoUrlField;


    const attachFile = (event) => {
        // 1. create an array for file
        const files = Array.from(event.target.files)

        // 2. for every attachment, append file to formData
        files.forEach(
            (file, index) => {
                formData.append(index, file)
            }
        )
    }

    const updateUser = () => {
        const errors = [];
        // Validate the user's input
        if(firstNameField.value.length === 0) {
            errors.push("Please enter your first name!");
        }

        if(lastNameField.value.length === 0) {
            errors.push("Please enter your last name!");
        }

        if(emailField.value.length === 0) {
            errors.push("Please enter your email!");
        }

        // if(passwordField.value.length === 0) {
        //     errors.push("Please enter your password!");
        // }


        // If there are errors
        if(errors.length > 0) {
            setState(
                {
                    loading: false,
                    showErrors: true,
                    errors: errors,
                    updateSuccess: false
                }
            )
        } 
        // If no errors
        else {
            setState(
                {
                    ...state,
                    loading: true,

                }
            );

            // Capture all of user's response
            // 1. Create an object called formData
            // 2. For every field, add index and value to formData
            formData.append('firstName', firstNameField.value)
            formData.append('lastName', lastNameField.value)
            formData.append('email', emailField.value)
            formData.append('password', passwordField.value)
            formData.append('phone', phoneField.value)
            formData.append('photoUrl', photoUrlField.value)

            // 4. Send to backend
            fetch(
                'http://localhost:3001/users/update',
                {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
                        //"Content-Type": "application/json"
                    }
                }
            )
            // First, convert string from backend to json
            .then(
                (backendResponse) => backendResponse.json()
            )
            // Then, we can read the json from backend
            .then(
                (json) => {
                    console.log(json);
                    setState(
                        {
                            loading: false,
                            showErrors: false,
                            errors: null,
                            updateSuccess: true
                        }
                    );
                }
            )
            // If promise did not resolve
            .catch(
                (error) => {
                    console.log('an error occured', error)
                }
            )

        }
    }

        return (
            <div className="container mt-5 mb-5" 
            style={
                {
                    maxWidth: "40em"
                }
            }>
            <h1>Profile Settings</h1>
            <br/>

            {
                state.showErrors === true && 
                <div className="error-messages alert alert-danger">
                    <ol>
                    { 
                        state.errors.map(
                            (error) =>
                                <li>
                                    {error}
                                </li>
                        ) 
                    }
                    </ol>
                </div>
            }

            {
                globalState.profile &&
            
            <div
                style ={
                    {
                    backgroundImage: `url(${globalState.profile.photoUrl})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    width: '256px',
                    height: '256px',
                    margin: '0 auto',
                    display: 'block',
                    borderRadius: '100%'
                    }
                }
                />
            }

            <label>Enter your firstname *</label>
            <input 
            defaultValue = {globalState.profile && globalState.profile.firstName}
            ref={(elem) => firstNameField = elem}
            className="field form-control" name="firstName" type="text" />

            <label>Enter your lastname *</label>
            <input 
            defaultValue = {globalState.profile && globalState.profile.lastName}
            ref={(elem) => lastNameField = elem}
            className="field form-control" name="lastName" type="text" />

            <label>Enter your email *</label>
            <input 
            defaultValue = {globalState.profile && globalState.profile.email}
            ref={(elem) => emailField = elem}
            className="field form-control" name="email" type="text" />

            <label>Enter a password *</label>
            <input 
            ref={(elem) => passwordField = elem}
            className="field form-control" name="password" 
            autocomplete="off" type="password" />

            <label>Enter your phone (optional)</label>
            <input 
            defaultValue = {globalState.profile && globalState.profile.phoneNumber}
            ref={(elem) => phoneField = elem}
            className="field form-control" name="phone" type="text" />

            <br/><br/>

            <label>Upload your profile picture</label>
            <input 
            onChange={attachFile}
            className="field form-control" id="photo" name="file" 
            type="file" multiple="multiple"/>

            <input 
            ref = {(elem) => {photoUrlField = elem}}
            defaultValue = {globalState.profile && globalState.profile.photoUrl}
            className="field form-control" 
            type="hidden"/>

            <br/><br/>

           
            <br/><br/>

            {
                !state.loading && !state.updateSuccess &&
                <button 
                    className="btn btn-primary"
                    onClick={updateUser}
                    style={
                        {
                            padding: "10px", 
                            fontSize: "16px"
                        }
                    }>
                        Update
                </button>
            }

            {
                state.loading &&
                <div>Loading...</div>
            }


            {
                state.updateSuccess === true &&
                <div className="alert alert-success">Update Successful!</div>
            }
            
        </div>
        );
    }
    
export default ProfileScreen;