import React, { forwardRef } from 'react'
import styles from './FormInput.module.css'

const FormInput = forwardRef((props, ref) => {
    return (
        <div className={styles.input}>
            <label>{props.label}</label>
            <input type="text" ref={ref} onBlur={props.onBlur} onInput={props.onInput}/>
            <p>{props.status.showError && props.status.inValidMessage}</p>
        </div>
    )
});

export default FormInput