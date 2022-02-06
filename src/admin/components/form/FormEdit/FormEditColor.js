import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FastField, Form, Formik } from 'formik';
import * as Yup from "yup";
import {
    getColor, updateColor,
} from '../../../../redux/actions/productActions';
import "../style.scss";
import AddField from '../../add/AddField';
import { Link } from 'react-router-dom';

const FromEditColor = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const set_color = useSelector((state) => state.product.color);

    const initialValues = {
        name: '',
        code: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min("3", "Tên sản phẩm tối thiểu 3 kí tự")
            .max(100, "Tên sản phẩm tối đa 100 kí tự")
            .required("Bạn phải nhập tên màu"),
        code: Yup.string()
            .min("6", "Tên sản phẩm tối thiểu 6 kí tự")
            .max(10, "Tên sản phẩm tối đa 10 kí tự")
            .required("Bạn phải nhập mã màu")
    });

    useEffect(() => {
        document.title = "Manage Colors";
        if (id) dispatch(getColor(id));

        // notify();
        // setTimeout(clearMess, 5000);
        // history.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Formik
            enableReinitialize
            initialValues={set_color || initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(
                    updateColor({
                        id: props.match.params.id,
                        name: values.name,
                        code: values.code,
                    })
                )
            }}
        // enableReinitialize
        >
            {(formikProps) => {

                return (
                    <section className="tab-components">
                        <Form>
                            <div className="container-fluid">
                                {/* ========== title-wrapper start ========== */}
                                <div className="title-wrapper pt-30">
                                    <div className="row align-items-center">
                                        <div className="col-md-6">
                                            <div className="title mb-30">
                                                <h2>Edit Color</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/colors`}
                                                        className="main-btn active-btn btn-hover"
                                                    >
                                                        <i className="fas fa-chevron-circle-left"></i>&ensp;Back To List
                                                    </Link>
                                                    &nbsp;
                                                    <button type='submit' className="main-btn success-btn btn-hover">
                                                        <i className="fas fa-save"></i>&ensp;Save Edit
                                                    </button>
                                                </nav>
                                            </div>
                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row */}
                                </div>
                                {/* ========== title-wrapper end ========== */}
                                {/* ========== form-elements-wrapper start ========== */}
                                <div className="form-elements-wrapper">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {/* input style start */}
                                            <div className="card-style mb-30">
                                                <FastField
                                                    label="Color Name"
                                                    name='name'
                                                    component={AddField}
                                                    value={set_color.name}
                                                />
                                                <FastField
                                                    label="Color Code"
                                                    name='code'
                                                    component={AddField}
                                                    value={set_color.code}
                                                />
                                                {/* end input */}
                                            </div>
                                            {/* end card */}
                                            {/* ======= input style end ======= */}
                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row */}
                                </div>

                                {/* ========== form-elements-wrapper end ========== */}
                            </div>
                            {/* end container */}
                        </Form>
                    </section>
                )
            }}
        </Formik>
    )
}

export default FromEditColor
