import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FastField, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import "../style.scss";
import AddField from '../../add/AddField';
import ImageField from '../../add/ImageField';
import CKEditorField from '../../add/CKEditorField';
import SelectField from '../../add/SelectField';
import { Link } from 'react-router-dom';
import { getCategories } from '../../../../redux/actions/categoryActions';
import { storeImage, storeImageAndContinue } from '../../../../redux/actions/imageActions';
import MultiSelectField from '../../add/MultiSelectField';

const FormAddImage = () => {
    const dispatch = useDispatch();

    const [cate, setCate] = useState([]);
    const [file, setFile] = useState([]);
    const [save, setSave] = useState("true");

    const lstCategory = useSelector((state) => state.category.categories);

    const initialValues = {
        title: '',
        image: '',
        categoryId: '',
        content: '',
        promotion: '',
        position: '0',
        status: '1',
    };

    const setSelectCategory = () => {
        lstCategory.Categories.forEach((value) => {
            if (value.status === '1') {
                let objcategory = { value: value._id, label: value.name }
                setCate((oldVal) => [...oldVal, objcategory]);
            }
        });
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, "Tiêu đề hình tối thiểu 3 kí tự")
            .required("Bạn phải nhập tên hình"),
        image: Yup.string().required("Bạn phải chọn hình ảnh cho hình"),
        position: Yup.string().required("Bạn phải chọn vị trí cho hình"),
        status: Yup.string().required("Bạn phải chọn trạng thái cho hình"),
    });

    useEffect(() => {
        document.title = "Manage Images";
        dispatch(getCategories());

        setSelectCategory();

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
                    categoryId: values.categoryId,
                    content: values.content,
                    promotion: values.promotion,
                    position: values.position,
                    status: values.status
                };
                const formData = new FormData();
                for (let i = 0; i < file.length; i++) {
                    formData.append("image", file[i]);
                }
                formData.append("infos", JSON.stringify(value));
                if (save === "true") {
                    dispatch(storeImage(formData));

                } else {
                    dispatch(storeImageAndContinue(formData));
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
                                                <h2>Add Image</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/images`}
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
                                                    placeholder='Input Image Title'
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
                                                    label="Content"
                                                    component={CKEditorField}
                                                    name='content'
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Promotion"
                                                    name='promotion'
                                                    component={AddField}
                                                    placeholder='Input Promotion'
                                                />
                                                {/* end input */}
                                                <Field
                                                    name='Category'
                                                    label='categoryId'
                                                    component={MultiSelectField}
                                                    placeholder='Select category...'
                                                    id='categoryId'
                                                    options={cate}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    name='position'
                                                    label='Position'
                                                    component={SelectField}
                                                    placeholder='Select position'
                                                    id='position'
                                                    options={[
                                                        { value: "0", label: "Slider" },
                                                        { value: "1", label: "Product Left" },
                                                        { value: "2", label: "Product Right" },
                                                    ]}
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

export default FormAddImage
