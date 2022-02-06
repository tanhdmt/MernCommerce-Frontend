import React, { useEffect, useState } from 'react'
import Select from "react-select";
import PropTypes from 'prop-types'
import { ErrorMessage } from "formik";

MultiSelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
    data: PropTypes.string,
};

MultiSelectField.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
    data: '',
};

export default function MultiSelectField(props) {
    // eslint-disable-next-line no-unused-vars
    const [defaultValue, setDefaultValue] = useState([]);
    const { field, form, label, placeholder, options, data } = props;
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    // eslint-disable-next-line no-unused-vars
    const selectedOption = options.find((option) => option.value === value);

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = [];
        // console.log(Object.entries(selectedOption))
        setDefaultValue(selectedOption);
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(selectedOption)) {
            selectedValue.push(value.value);
            // console.log(selectedValue)
        }
        const changeEvent = {
            target: {
                name: name,
                value: selectedValue.toString(),
            },
        };
        field.onChange(changeEvent);
        // console.log(field)
    };

    useEffect(() => {
        if (data !== "") {
            let dataArr = data.split(",");
            let valueArr = [];
            dataArr.forEach((data) => {
                options.forEach((option) => {
                    if (data.includes(option.value)) {
                        valueArr.push(option)
                    }
                });
            });
            setDefaultValue(valueArr);
        } else {
            return;
        }
    }, [data, options]);

    return (
        <div className="input-style-1">
            <label>{label}</label>
            <Select
                closeMenuOnSelect={false}
                name={name}
                id={name}
                onChange={handleSelectedOptionChange}
                value={defaultValue}
                isMulti
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
