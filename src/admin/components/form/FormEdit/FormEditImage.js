import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FastField, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import "../style.scss";
import AddField from '../../add/AddField';
import ImageField from '../../add/ImageField';
import CKEditorField from '../../add/CKEditorField';
import SelectField from '../../add/SelectField';
import { getImage, updateImage } from '../../../../redux/actions/imageActions';
import { getCategories } from '../../../../redux/actions/categoryActions';
import MultiSelectField from '../../add/MultiSelectField';

const FormEditImage = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const [cate, setCate] = useState([]);
    const [file, setFile] = useState([]);

    const set_image = useSelector((state) => state.image.image);
    const lstCate = useSelector((state) => state.category.categories);

    const initialValues = set_image.length !== 0
        ? {
            title: set_image.title,
            image: set_image.image,
            categoryId: set_image.categoryId,
            content: set_image.content,
            promotion: set_image.promotion,
            position: set_image.position,
        } : {
            title: '',
            image: '',
            categoryId: '',
            content: '',
            promotion: '',
            position: '0',
            status: '1',
        };

    const setSelectCate = () => {
        lstCate.Categories.forEach((value) => {
            let objCate = { value: value._id, label: value.name }
            setCate((oldVal) => [...oldVal, objCate]);
        });
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(5, "Tiêu đề hình tối thiểu 5 kí tự")
            .required("Bạn phải nhập tên hình"),
        image: Yup.string().required("Bạn phải chọn hình ảnh cho hình"),
        position: Yup.string().required("Bạn phải chọn vị trí cho hình"),
    });

    useEffect(() => {
        document.title = "Manage Images";
        if (id) dispatch(getImage(id));
        dispatch(getCategories());

        setSelectCate();

        // notify();
        // setTimeout(clearMess, 5000);
        // history.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);




    return (
        <Formik
            enableReinitialize
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
                console.log(values)
                const formData = new FormData();
                for (let i = 0; i < file.length; i++) {
                    formData.append("image", file[i]);
                }
                formData.append("infos", JSON.stringify(value));
                dispatch(updateImage({ formData: formData, id: props.match.params.id }));
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
                                                <h2>Edit Image</h2>
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
                                                    data={set_image.image}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Content"
                                                    component={CKEditorField}
                                                    name='content'
                                                    data={set_image.content}
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
                                                    name='categoryId'
                                                    label='Category'
                                                    component={MultiSelectField}
                                                    placeholder='Select category...'
                                                    id='categoryId'
                                                    options={cate}
                                                    data={set_image.categoryId}

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

export default FormEditImage
