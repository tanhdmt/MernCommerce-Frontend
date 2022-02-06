import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FastField, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { getCategories } from '../../../../redux/actions/categoryActions';
import {
    getColors,
    getSizes,
    storeProduct,
    storeProductAndContinue
} from '../../../../redux/actions/productActions';
import "../style.scss";
import AddField from '../../add/AddField';
import ImageField from '../../add/ImageField';
import CKEditorField from '../../add/CKEditorField';
import MultiSelectField from '../../add/MultiSelectField';
import SelectField from '../../add/SelectField';
import { Link } from 'react-router-dom';

const FromAddProduct = () => {
    const dispatch = useDispatch();

    const [cate, setCate] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [file, setFile] = useState([]);
    const [save, setSave] = useState("true");

    const lstCate = useSelector((state) => state.category.categories);
    const lstColors = useSelector((state) => state.product.colors_list);
    const lstSizes = useSelector((state) => state.product.sizes_list);

    const initialValues = {
        name: '',
        image: '',
        categoryId: '',
        color: '',
        size: '',
        details: '',
        type: '1',
        price: 0,
        priceDiscount: 0,
        quantity: 0,
        status: '1',
    };

    const setSelectCate = () => {
        lstCate.Categories.forEach((value) => {
            if (value.status === '1') {
                let objCate = { value: value._id, label: value.name }
                setCate((oldVal) => [...oldVal, objCate]);
            }
        });
    };

    const setSelectColors = () => {
        lstColors.Colors.forEach((value) => {
            let objColors = { value: value._id, label: value.name }
            setColors((oldVal) => [...oldVal, objColors]);
        });
    };

    const setSelectSizes = () => {
        lstSizes.Sizes.forEach((value) => {
            let objSizes = { value: value._id, label: value.name }
            setSizes((oldVal) => [...oldVal, objSizes]);
        });
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min("5", "Tên sản phẩm tối thiểu 5 kí tự")
            .max(100, "Tên sản phẩm tối đa 100 kí tự")
            .required("Bạn phải nhập tên sản phẩm"),
        image: Yup.string().required("Bạn phải chọn hình ảnh cho sản phẩm"),
        categoryId: Yup.string().required("Bạn phải chọn danh mục cho sản phẩm"),
        color: Yup.string().required("Bạn phải chọn màu cho sản phẩm"),
        size: Yup.string().required("Bạn phải chọn size cho sản phẩm"),
        details: Yup.string().required("Bạn phải nhập mô tả cho sản phẩm"),
        price: Yup.number()
            .min(20000, "Giá sản phẩm tôi thiểu từ 20.000đ")
            .required("Bạn phải nhập giá cho sản phẩm"),
        priceDiscount: Yup.number()
            .required(
                "Bạn phải nhập giá khuyến mãi cho sản phẩm"
            ),
        status: Yup.string().required("Bạn phải chọn trạng thái cho sản phẩm"),
        quantity: Yup.number().required("Bạn phải nhập số lượng sản phẩm trong kho"),
    });

    useEffect(() => {
        document.title = "Manage Products";
        dispatch(getCategories());
        dispatch(getColors());
        dispatch(getSizes());

        setSelectCate();
        setSelectColors();
        setSelectSizes();

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
                    name: values.name,
                    image: values.image,
                    categoryId: values.categoryId,
                    color: values.color,
                    size: values.size,
                    details: values.details,
                    type: values.type,
                    price: values.price,
                    priceDiscount: values.priceDiscount,
                    quantity: values.quantity,
                    status: values.status
                };
                const formData = new FormData();
                for (let i = 0; i < file.length; i++) {
                    formData.append("image", file[i]);
                }
                formData.append("infos", JSON.stringify(value));
                if (save === "true") {
                    dispatch(storeProduct(formData));
                } else {
                    dispatch(storeProductAndContinue(formData));
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
                                                <h2>Add Product</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/products`}
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
                                                    label="Product Name"
                                                    name='name'
                                                    component={AddField}
                                                    placeholder='Input Product Name'
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
                                                    label="Price"
                                                    type='number'
                                                    name='price'
                                                    component={AddField}
                                                    placeholder='Input Price Product'
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Price Discount"
                                                    type='number'
                                                    name='priceDiscount'
                                                    component={AddField}
                                                    placeholder='Input Price Discount'
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Quantity"
                                                    type='number'
                                                    name='quantity'
                                                    component={AddField}
                                                    placeholder='Input Quantity'
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Details"
                                                    component={CKEditorField}
                                                    name='details'
                                                />
                                                {/* end input */}
                                                <Field
                                                    name='categoryId'
                                                    label='Category'
                                                    component={MultiSelectField}
                                                    placeholder='Select category...'
                                                    id='categoryId'
                                                    options={cate}
                                                />
                                                {/* end input */}
                                                <Field
                                                    name='color'
                                                    label='Color'
                                                    component={MultiSelectField}
                                                    placeholder='Select color...'
                                                    id='color'
                                                    options={colors}
                                                />
                                                {/* end input */}
                                                <Field
                                                    name='size'
                                                    label='Size'
                                                    component={MultiSelectField}
                                                    placeholder='Select size...'
                                                    id='size'
                                                    options={sizes}
                                                />
                                                {/* <div className="input-style-1">
                                                    <label>Size</label>
                                                    <Select closeMenuOnSelect={false} isMulti options={sizes} />
                                                </div> */}
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

export default FromAddProduct
