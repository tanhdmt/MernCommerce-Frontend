import React from 'react'
import Select from "react-select";
import PropTypes from 'prop-types'
import { ErrorMessage } from "formik";

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
};

SelectField.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
};

export default function SelectField(props){
    const { field, form, label, placeholder, disabled, options, data } = props;
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const selectedOption = options.find((option) => option.value === value);

    const setDefaultValue = (data, options) => {
        options.forEach((option) => {
            if (option.value === data) {
                return option.value;
            }else{
                return;
            }
        });
    };

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption
          ? selectedOption.value
          : selectedOption;
        const changeEvent = {
          target: {
            name: name,
            value: selectedValue,
          },
        };
        field.onChange(changeEvent);
      };

    return (
        <div className="input-style-1">
            <label>{label}</label>
            <Select
                closeMenuOnSelect={false}
                id={name}
                onChange={handleSelectedOptionChange}
                isDisable={disabled}
                value={selectedOption || setDefaultValue(data, options)}
                placeholder={placeholder}
                options={options}
                invalid={showError}
            />
            <ErrorMessage name={name}>
                {(msg) => <p className="input-message">{msg}</p>}
            </ErrorMessage>
        </div>
    )
}
