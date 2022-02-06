import { FastField, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { getCategories, getCategory, updateCategory } from '../../../../redux/actions/categoryActions';
import AddField from '../../add/AddField';
import ImageField from '../../add/ImageField';
import MultiSelectField from '../../add/MultiSelectField';
import SelectField from '../../add/SelectField';

const FormEditCategory = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const [cate, setCate] = useState([]);
    const [file, setFile] = useState([]);

    const set_category = useSelector((state) => state.category.category);
    const lstCate = useSelector((state) => state.category.categories);

    const initialValues = {
        name: '',
        image: '',
        parentCate: '',
        type: '0',
        status: '1',
    };

    const setSelectCate = () => {
        lstCate.Categories.forEach((value) => {
            let objCate = { value: value._id, label: value.name }
            setCate((oldVal) => [...oldVal, objCate]);
        });
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min("2", "Tên danh mục sản phẩm tối thiểu 2 kí tự")
            .max(100, "Tên danh mục sản phẩm tối đa 100 kí tự")
            .required("Bạn phải nhập tên danh mục sản phẩm"),
        parentCate: Yup.string().required("Bạn phải chọn danh mục cha"),
        type: Yup.string().required("Bạn phải chọn kiểu cho danh mục sản phẩm"),
        status: Yup.string().required("Bạn phải chọn trạng thái cho danh mục sản phẩm"),
    });

    useEffect(() => {
        document.title = "Manage Products";
        if (id) dispatch(getCategory(id));
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
            initialValues={set_category || initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const value = {
                    name: values.name,
                    image: values.image,
                    parentCate: values.parentCate,
                    type: values.type,
                    status: values.status
                };
                const formData = new FormData();
                for (let i = 0; i < file.length; i++) {
                    formData.append("image", file[i]);
                }
                formData.append("infos", JSON.stringify(value));
                dispatch(updateCategory({ formData: formData, id: props.match.params.id }));
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
                                                <h2>Edit Category</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/categories`}
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
                                                    label="Category Name"
                                                    name='name'
                                                    component={AddField}
                                                    value={set_category.name}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    setFile={setFile}
                                                    name="image"
                                                    id="customFile"
                                                    component={ImageField}
                                                    data={set_category.image}
                                                />
                                                {/* end input */}
                                                <Field
                                                     name='parentCate'
                                                     label='Parent Cate'
                                                     component={MultiSelectField}
                                                     placeholder='Select category...'
                                                     id='parentCate'
                                                     options={cate}
                                                     data={set_category.parentCate}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    name='type'
                                                    label='Type'
                                                    component={SelectField}
                                                    placeholder='Select type'
                                                    id='type'
                                                    options={[
                                                        { value: "0", label: "Tất cả" },
                                                        { value: "1", label: "Nam" },
                                                        { value: "2", label: "Nữ" },
                                                        { value: "3", label: "Trẻ em" },
                                                        { value: "4", label: "Nam và Nữ" },
                                                        { value: "5", label: "Nữ và Trẻ em" },
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

export default FormEditCategory
