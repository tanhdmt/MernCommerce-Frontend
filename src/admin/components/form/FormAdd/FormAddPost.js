import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FastField, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { getTopics } from '../../../../redux/actions/topicActions';
import {
    storePost, storePostAndContinue
} from '../../../../redux/actions/postActions';
import "../style.scss";
import AddField from '../../add/AddField';
import ImageField from '../../add/ImageField';
import CKEditorField from '../../add/CKEditorField';
import SelectField from '../../add/SelectField';
import { Link } from 'react-router-dom';

const FormAddPost = () => {
    const dispatch = useDispatch();

    const [topic, setTopic] = useState([]);
    const [file, setFile] = useState([]);
    const [save, setSave] = useState("true");

    const lstTopic = useSelector((state) => state.topic.topics);

    const initialValues = {
        title: '',
        image: '',
        topicId: '',
        summary: '',
        content: '',
        type: '1',
        createdBy: 'Biên tập viên Fashi',
        status: '1',
    };

    const setSelectTopic = () => {
        lstTopic.Topics.forEach((value) => {
            if (value.status === '1') {
                let objTopic = { value: value._id, label: value.name }
                setTopic((oldVal) => [...oldVal, objTopic]);
            }
        });
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(5, "Tên bài viết tối thiểu 5 kí tự")
            .required("Bạn phải nhập tên bài viết"),
        image: Yup.string().required("Bạn phải chọn hình ảnh cho bài viết"),
        topicId: Yup.string().required("Bạn phải chọn chủ đề cho bài viết"),
        summary: Yup.string()
            .min(15, "Mô tả ngắn của bài viết tối thiểu 15 kí tự")
            .max(1000, "Mô tả ngắn của bài viết tối đa 1000 kí tự")
            .required("Bạn phải nhập mô tả ngắn cho bài viết"),
        content: Yup.string()
            .min(1000, "Nội dung của bài viết tối thiểu 2000 kí tự")
            .required("Bạn phải nhập nội dung cho bài viết"),
        createdBy: Yup.string().required("Bạn phải nhập tên người tạo bài viết"),
        status: Yup.string().required("Bạn phải chọn trạng thái cho bài viết"),
    });

    useEffect(() => {
        document.title = "Manage Posts";
        dispatch(getTopics());

        setSelectTopic();

        // notify();
        // setTimeout(clearMess, 5000);
        // history.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const value = {
                    title: values.title,
                    image: values.image,
                    topicId: values.topicId,
                    summary: values.summary,
                    content: values.content,
                    type: values.type,
                    createdBy: values.createdBy,
                    status: values.status
                };
                const formData = new FormData();
                for (let i = 0; i < file.length; i++) {
                    formData.append("image", file[i]);
                }
                formData.append("infos", JSON.stringify(value));
                if (save === "true") {
                    dispatch(storePost(formData));

                } else {
                    dispatch(storePostAndContinue(formData));
                }
            }}
        >
            {(formikProps) => {
                // eslint-disable-next-line no-unused-vars
                const { values } = formikProps;
                return (
                    <section className="tab-components">
                        <Form>
                            <div className="container-fluid">
                                {/* ========== title-wrapper start ========== */}
                                <div className="title-wrapper pt-30">
                                    <div className="row align-items-center">
                                        <div className="col-md-6">
                                            <div className="title mb-30">
                                                <h2>Add Post</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/posts`}
                                                        className="main-btn active-btn btn-hover"
                                                    >
                                                        <i className="fas fa-chevron-circle-left"></i>&ensp;Back To List
                                                    </Link>
                                                    &nbsp;
                                                    <button type='submit' className="main-btn success-btn btn-hover"
                                                        onClick={() => setSave("true")}
                                                    >
                                                        <i className="fas fa-save"></i>&ensp;Save
                                                    </button>
                                                    &nbsp;
                                                    <button type='submit' className="main-btn info-btn btn-hover"
                                                        onClick={() => setSave("false")}
                                                    >
                                                        <i className="far fa-save"></i>&ensp;Save and continue
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
                                                    label="Title"
                                                    name='title'
                                                    component={AddField}
                                                    placeholder='Input Post Title'
                                                />
                                                {/* end input */}
                                                <FastField
                                                    setFile={setFile}
                                                    name="image"
                                                    id="customFile"
                                                    component={ImageField}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Summary"
                                                    component={CKEditorField}
                                                    name='summary'
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Content"
                                                    component={CKEditorField}
                                                    name='content'
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Created By"
                                                    name='createdBy'
                                                    component={AddField}
                                                    placeholder='Input Created By'
                                                />
                                                {/* end input */}
                                                <Field
                                                    name='topicId'
                                                    label='Topic'
                                                    component={SelectField}
                                                    placeholder='Select topic...'
                                                    id='topicId'
                                                    options={topic}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    name='status'
                                                    label='Status'
                                                    component={SelectField}
                                                    placeholder='Select status'
                                                    id='status'
                                                    options={[
                                                        { value: "1", label: "Hiện" },
                                                        { value: "0", label: "Ẩn" },
                                                    ]}
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

export default FormAddPost
