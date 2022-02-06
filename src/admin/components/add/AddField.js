import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage } from 'formik';

AddField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

AddField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
};

export default function AddField (props) {
    const { field, type, label, placeholder, disabled } = props;
    const {name} = field;
    return (
        <div className="input-style-1">
            {label && <label>{label}</label>}
            <input 
                type={type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
            />
            <ErrorMessage name={name}>
                {(msg) => <p className="input-message">{msg}</p>}
            </ErrorMessage>
        </div>
    )
}
