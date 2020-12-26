import React, { useState } from 'react';

const RegistrationScreen = () => {


    const [ state, setState ] = useState(
        {
            showErrors: false,
            loading: false,
            registeredSuccess: false
        }
    )
    
    const formData = new FormData();
    
    // Undefined only before return
    let firstNameField;
    let lastNameField;
    let emailField;
    let passwordField;
    let phoneField;
    let tcsCheckBox;

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

    const registerUser = () => {
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

        if(passwordField.value.length === 0) {
            errors.push("Please enter your password!");
        }

        if(tcsCheckBox.checked === false) {
            errors.push("You need to accept terms & conditions.");
        }

        // If there are errors
        if(errors.length > 0) {
            setState(
                {
                    loading: false,
                    showErrors: true,
                    errors: errors,
                    registeredSuccess: false
                }
            )
        } 
        // If no errors
        else {
            setState(
                {
                    loading: true,
                    showErrors: false,
                    errors: null,
                    registeredSuccess: false
                }
            );

            // Capture all of user's response
            // 1. Create an object called formData
            // 2. For every field, add index and value to formData
            formData.append('firstName', firstNameField.value);
            formData.append('lastName', lastNameField.value)
            formData.append('email', emailField.value)
            formData.append('password', passwordField.value)
            formData.append('phone', phoneField.value)

            // 4. Send to backend
            fetch(
                'http://localhost:3001/users/register',
                {
                    method: 'POST',
                    body: formData,
                    headers: {
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
                            registeredSuccess: true
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

    if( state.registeredSuccess === true ) {
        return(
            <div className="App">
                <div 
                style={{maxWidth: 600}}
                className="container mt-5 mb-5">
                    <div className="alert alert-success">
                        Account registered succesfully!
                    </div>

                    <button className="btn btn-primary">Login</button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container mt-5 mb-5" 
            style={
                {
                    maxWidth: "40em"
                }
            }>
            <h1>Register</h1>
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

            <label>Enter your firstname *</label>
            <input 
            ref={(elem) => firstNameField = elem}
            className="field form-control" name="firstName" type="text" />

            <label>Enter your lastname *</label>
            <input 
            ref={(elem) => lastNameField = elem}
            className="field form-control" name="lastName" type="text" />

            <label>Enter your email *</label>
            <input 
            ref={(elem) => emailField = elem}
            className="field form-control" name="email" type="text" />

            <label>Enter a password *</label>
            <input 
            ref={(elem) => passwordField = elem}
            className="field form-control" name="password" 
            autocomplete="off" type="password" />

            <label>Enter your phone (optional)</label>
            <input 
            ref={(elem) => phoneField = elem}
            className="field form-control" name="phone" type="text" />

            <br/><br/>

            <label>Upload your profile picture</label>
            <input 
            onChange={attachFile}
            className="field form-control" id="photo" name="file" 
            type="file" multiple="multiple"/>

            <br/><br/>

            <label>Do you agree to terms &amp; conditions? *</label>
            <input 
            ref={(elem) => tcsCheckBox = elem}
            className="checkbox" name="termsConditions" type="checkbox" /> Yes

            <br/><br/>

            {
                !state.loading && !state.registeredSuccess &&
                <button 
                    className="btn btn-primary"
                    onClick={registerUser}
                    style={
                        {
                            padding: "10px", 
                            fontSize: "16px"
                        }
                    }>
                        Register
                </button>
            }

            {
                state.loading &&
                <div>Loading...</div>
            }
            
        </div>
        )
    }
}

export default RegistrationScreen;