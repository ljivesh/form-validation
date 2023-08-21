


import React, {  useReducer, useRef } from 'react'
import styles from './Form.module.css';
import Card from '../UI/Card';
import FormInput from './components/FormInput/FormInput';


const formStatusReducer = (state, action) => {

    if (action.type === 'EMAIL_VALID') {
        return { ...state, email: { isValid: true, touched: true, showError:false } };
    }
    if (action.type === 'EMAIL_INVALID') {
        return { ...state, email: { isValid: false, touched: true, showError:true, inValidMessage: "Please enter a valid email" } };
    }
    if (action.type === 'EMAIL_EMPTY') {
        return { ...state, email: { isValid: false, touched: true, showError:true, inValidMessage: "Email feild cannot be empty" } }
    }

    if (action.type === 'PASSWORD_VALID') {
        return { ...state, password: { isValid: true, touched: true, showError:false } };
    }
    if (action.type === 'PASSWORD_INVALID') {
        return { ...state, password: { isValid: false, touched: true, showError:true,  inValidMessage: "Password length should be greater than 8 characters" } };
    }
    if (action.type === 'PASSWORD_EMPTY') {
        return { ...state, password: { isValid: false, touched: true, showError: true, inValidMessage: "Password feild cannot be empty" } }
    }


};


const Form = () => {
    

    const [formStatus, dispatchFormStatus] = useReducer(formStatusReducer, {
        email: {
            isValid: false,
            touched: false,
            showError: false,
            inValidMessage: ""
        },
        password: {
            isValid: false,
            touched: false,
            showError: false,
            inValidMessage: ""
        },
    })

    const formRef = {
        emailRef: useRef(),
        passwordRef: useRef(),
    }

    const inputHandler = (event)=> {

        
        if(formRef.emailRef.current=== event.target) {

            if(formStatus.email.touched) {

                const enteredEmail = formRef.emailRef.current.value;
                if(enteredEmail.length === 0) {
                    dispatchFormStatus({type: 'EMAIL_EMPTY'});
                }
                else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(enteredEmail)) {
                    dispatchFormStatus({type: 'EMAIL_INVALID'});
                }
                else {
                    dispatchFormStatus({type: 'EMAIL_VALID'});
                }
            }

        }

        if(formRef.passwordRef.current=== event.target) {

            if(formStatus.password.touched) {

                const enteredPassword = formRef.passwordRef.current.value;
                
                if(enteredPassword.length === 0) {
                    dispatchFormStatus({type: 'PASSWORD_EMPTY'});
                }
                else if (enteredPassword.trim().length < 8) {
                    dispatchFormStatus({type: 'PASSWORD_INVALID'});
                }
                else {
                    dispatchFormStatus({type: 'PASSWORD_VALID'});
                }
            }

        }
    }
    
    
    const blurHandler = (event) => {

        const enteredEmail = formRef.emailRef.current.value;
        const enteredPassword = formRef.passwordRef.current.value;
        

        if(formRef.emailRef.current=== event.target) {
            if(enteredEmail.length === 0) {
                dispatchFormStatus({type: 'EMAIL_EMPTY'});
            }
            else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(enteredEmail)) {
                dispatchFormStatus({type: 'EMAIL_INVALID'});
            }
            else {
                dispatchFormStatus({type: 'EMAIL_VALID'});
            }
        }

        if(formRef.passwordRef.current=== event.target) {
            if(enteredPassword.length === 0) {
                dispatchFormStatus({type: 'PASSWORD_EMPTY'});
            }
            else if (enteredPassword.trim().length < 8) {
                dispatchFormStatus({type: 'PASSWORD_INVALID'});
            }
            else {
                dispatchFormStatus({type: 'PASSWORD_VALID'});
            }
        }
    }

    const submissionHandler = (event) => {

        event.preventDefault();
        if(formStatus.email.isValid && formStatus.password.isValid) {
            console.log("Form Sumbitted");
        } else {

            const enteredEmail = formRef.emailRef.current.value;
            const enteredPassword = formRef.passwordRef.current.value;

            if(enteredEmail.length === 0) dispatchFormStatus({type: 'EMAIL_EMPTY'});
            if(enteredPassword.length === 0) dispatchFormStatus({type: 'PASSWORD_EMPTY'});
        }

    }

    return (
        <Card >
            <form onSubmit={submissionHandler}>
                <div className={styles.title}>
                    <h2>Validation Form</h2>
                </div>
                <FormInput label="Email" ref={formRef.emailRef} status={formStatus.email} onBlur={blurHandler} onInput={inputHandler}/>
                <FormInput label="Password" ref={formRef.passwordRef} status={formStatus.password} onBlur={blurHandler} onInput={inputHandler}/>
                <div className={styles['form-actions']}>
                    <button type="submit">Login</button>
                </div>
            </form>
        </Card>
    )
}

export default Form