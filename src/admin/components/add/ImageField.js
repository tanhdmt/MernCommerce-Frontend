import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage } from 'formik';
import { useRouteMatch } from 'react-router-dom'

ImageField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    data: PropTypes.string
};

ImageField.defaultProps = {
    data: '',
};

export default function ImageField(props) {
    let match = useRouteMatch('/admin/:slug');
    // eslint-disable-next-line no-unused-vars
    const [filename, setFilename] = useState([]);
    const [img, setImg] = useState([]);
    const { field, form, data } = props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    const onChange = (e) => {
        setImg([]);
        setFilename([]);
        showImg(e.target.files);
        const arrImg = [];
        Object.entries(e.target.files).forEach((value) => {
            arrImg.push(value[1].name)
        });
        props.setFile(e.target.files);
        //fake event onchange
        const changeEvent = {
            target: {
                name: name,
                value: arrImg.toString(),
            },
        };
        field.onChange(changeEvent);
    }

    const showImg = (imgArr) => {
        Object.entries(imgArr).forEach((value) => {
            setFilename((oldVal) => [...oldVal, value[1].name]);
            setImg((oldVal) => [...oldVal, URL.createObjectURL(value[1])]);
            
        });
    
    };

    return (
        <div className="input-style-1">
            <label>Image</label>
            <div className="d-inline-flex justify-content-start align-items-center flex-row">
                <input
                    className="input-image"
                    type="file"
                    id="customFile"
                    onChange={onChange}
                    multiple
                    invalid={showError}
                />
                {img.length !== 0 ? (
                    img.map((value, key) => {
                        return (
                            <img
                                key={key}
                                className="product_img-add"
                                src={value}
                                alt="hình sản phẩm"
                            />
                        );
                    })
                ) : data !== "" ? (
                    data.split(",").map((value, key) => {
                        return (
                            <img
                                key={key}
                                className="product_img-add"
                                src={`http://localhost:5000/${match.url.split('/')[2]}/${value}`}
                                alt="hình sản phẩm nè"
                            />
                        );
                    })
                ) : (
                    <img
                        src="https://admin-demo.nopcommerce.com/images/thumbs/default-image_100.png"
                        alt="hình sản phẩm"
                    />
                )}
                &emsp;
                <label
                    htmlFor="customFile"
                    className="main-btn btn-hover deactive-btn"
                >
                    Chọn hình
                </label>
                <ErrorMessage name={name}>
                    {(msg) => <p className="input-message">{msg}</p>}
                </ErrorMessage>
            </div>

        </div>
    )
}
