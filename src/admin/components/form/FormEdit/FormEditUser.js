import { FastField, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { getUser, updateUser } from '../../../../redux/actions/userActions';
import AddField from '../../add/AddField';
import SelectField from '../../add/SelectField';

const FormEditUser = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const user = useSelector((state) => state.user.user);
    // const lstTopic = useSelector((state) => state.topic.topics);

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        phone: '',
        address: '',
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .max(15, "Tối đa 15 kí tự")
            .required("Bạn phải nhập họ"),
        lastName: Yup.string()
            .max(8, "Tối đa 8 kí tự")
            .required("Bạn phải nhập Tên"),
        phone: Yup.string()
            .min(10, "Tối thiểu 10 kí tự")
            .max(11, "Tối đa 11 kí tự")
            .required("Bạn phải nhập Số ĐT"),
        address: Yup.string()
            .required("Bạn phải nhập địa chỉ"),
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Bạn phải nhập Email"),
    });

    useEffect(() => {
        document.title = "Manage Orders";
        if (id) dispatch(getUser(id));

        // notify();
        // setTimeout(clearMess, 5000);
        // history.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Formik
            enableReinitialize
            initialValues={user || initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(updateUser({
                    id: props.match.params.id,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    role: values.role,
                    phone: values.phone,
                    address: values.address,
                }));
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
                                                <h2>Edit User</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/users`}
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
                                                    label="First Name"
                                                    name='firstName'
                                                    component={AddField}
                                                    value={user.firstName}
                                                />
                                                <FastField
                                                    label="Last Name"
                                                    name='lastName'
                                                    component={AddField}
                                                    value={user.lastName}
                                                />
                                                <FastField
                                                    label="Email"
                                                    name='email'
                                                    component={AddField}
                                                    value={user.email}
                                                />
                                                {/* end input */}
                                                <Field
                                                    label='Role'
                                                    name='role'
                                                    component={SelectField}
                                                    placeholder='Select role...'
                                                    id='role'
                                                    options={[
                                                        { value: 0, label: "User" },
                                                        { value: 1, label: "Admin" },
                                                    ]}
                                                    data={user.role}
                                                />
                                                <FastField
                                                    label="Phone"
                                                    name='phone'
                                                    component={AddField}
                                                    value={user.phone}
                                                />
                                                <FastField
                                                    label="Address"
                                                    name='address'
                                                    component={AddField}
                                                    value={user.address}
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

export default FormEditUser
