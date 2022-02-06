import React from "react";
import PropTypes from "prop-types";

TextareaField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

TextareaField.defaultProps = {
    label: "",
    placeholder: "",
    className: "",
    disabled: false,
};

interface TextareaProps {
    field: { name: string };
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    label?: string;
}

export default function TextareaField(props: TextareaProps) {
    const { field, placeholder, disabled, className, label } = props;
    return (
        <div className={className}>
            {label && (
                <label>
                    {label}
                    <span>*</span>
                </label>
            )}
            <textarea
                rows={6}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
            />
        </div>
    );
}
