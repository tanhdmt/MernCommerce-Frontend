import React from "react";
import PropTypes from "prop-types";

RadioField.propsTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    value: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};
RadioField.defaultProps = {
    value: "text",
    label: "",
    className: "",
    disabled: false,
};

interface RadioProps {
    field: { name: string };
    type?: string;
    placeholder?: string;
    disabled?: boolean;
}

export default function RadioField(props: RadioProps) {
    const { field, type, placeholder, disabled } = props;
    const { name } = field;
    return (
        <div className="group-input">
            <div className="checkbox__sex">
                <input
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...field}
                />
                <span>Nữ</span>
            </div>
        </div>
    );
}
