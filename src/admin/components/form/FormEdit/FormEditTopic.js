import { FastField, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { getTopic, getTopics, updateTopic } from '../../../../redux/actions/topicActions';
import AddField from '../../add/AddField';
import MultiSelectField from '../../add/MultiSelectField';

const FormEditTopic = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const [topic, setTopic] = useState([]);

    const set_topic = useSelector((state) => state.topic.topic);
    const lstTopic = useSelector((state) => state.topic.topics);

    const initialValues = {
        name: '',
        parentTopic: '',
        status: '1',
    };

    const setSelectTopic = () => {
        lstTopic.Topics.forEach((value) => {
            let objTopic = { value: value._id, label: value.name }
            setTopic((oldVal) => [...oldVal, objTopic]);
        });
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min("3", "Tên chủ đề tối bài viết thiểu 3 kí tự")
            .max(100, "Tên chủ đề tối bài viết đa 100 kí tự")
            .required("Bạn phải nhập tên chủ đề bài viết"),
        status: Yup.string().required("Bạn phải chọn trạng thái cho chủ đề bài viết"),
    });

    useEffect(() => {
        document.title = "Manage Products";
        if (id) dispatch(getTopic(id));
        dispatch(getTopics());

        setSelectTopic();

        // notify();
        // setTimeout(clearMess, 5000);
        // history.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Formik
            enableReinitialize
            initialValues={set_topic || initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(updateTopic({
                    id: props.match.params.id,
                    name: values.name,
                    parentTopic: values.parentTopic,
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
                                                <h2>Edit Topic</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/topics`}
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
                                                    label="Topic Name"
                                                    name='name'
                                                    component={AddField}
                                                    value={set_topic.name}
                                                />
                                                {/* end input */}
                                                <Field
                                                    name='parentTopic'
                                                    label='Parent Cate'
                                                    component={MultiSelectField}
                                                    placeholder='Select category...'
                                                    id='parentTopic'
                                                    options={topic}
                                                    data={set_topic.parentTopic}
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

export default FormEditTopic
