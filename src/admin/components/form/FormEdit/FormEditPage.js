import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FastField, Form, Formik } from 'formik';
import * as Yup from "yup";
import { getTopics } from '../../../../redux/actions/topicActions';
import {
    getPage,
    updatePage
} from '../../../../redux/actions/pageActions';
import "../style.scss";
import AddField from '../../add/AddField';
import CKEditorField from '../../add/CKEditorField';
import { Link } from 'react-router-dom';

const FormEditPage = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const set_page = useSelector((state) => state.page.page);

    const initialValues = {
        title: '',
        content: '',
        updatedBy: '',
        status: '1',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(5, "Tên bài viết tối thiểu 5 kí tự")
            .required("Bạn phải nhập tên bài viết"),
        content: Yup.string()
            .min(2000, "Nội dung của bài viết tối thiểu 2000 kí tự")
            .required("Bạn phải nhập nội dung cho bài viết"),
        updatedBy: Yup.string().required("Bạn phải nhập tên người sửa bài viết"),
        status: Yup.string().required("Bạn phải chọn trạng thái cho bài viết"),
    });

    useEffect(() => {
        document.title = "Manage Pages";
        if (id) dispatch(getPage(id));
        dispatch(getTopics());

        // notify();
        // setTimeout(clearMess, 5000);
        // history.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);




    return (
        <Formik
            enableReinitialize
            initialValues={set_page || initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(updatePage({ values, id: props.match.params.id }));
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
                                                <h2>Edit Page</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/pages`}
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
                                                    label="Page Title"
                                                    name='title'
                                                    component={AddField}
                                                    value={set_page.title}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Content"
                                                    component={CKEditorField}
                                                    name='content'
                                                    data={set_page.content}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Updated By"
                                                    name='updatedBy'
                                                    component={AddField}
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

export default FormEditPage
