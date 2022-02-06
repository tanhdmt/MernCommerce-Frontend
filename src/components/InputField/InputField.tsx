import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage } from 'formik';

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    className: '',
    disabled: false,
};

interface InputProps {
    field: {name: string};
    form: any;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    label?: string;
}

export default function InputField (props: InputProps) {
    const { field, form, type, placeholder, disabled, className, label } = props;
    const {name} = field;
    const {errors, touched} = form;
    let showError;
    if (name) {
       showError = errors[name] && touched[name];
    }
    
    return (
        <div className={className}>
            {label && <label>{label}<span>*</span></label>}
            <input 
                className={showError ? "input-error" : ""}
                type={type}
                id={name.toString()}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                //invalid={showError}
            />
            {showError ? <i className="fas fa-exclamation-circle"></i> : null}
            <ErrorMessage name={name}>
                {(msg) => <p className="input-message">{msg}</p>}
            </ErrorMessage>
        </div>
    )
}
