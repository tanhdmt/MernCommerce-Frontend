/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Slider from "react-slick";
import { addCart } from "../../redux/actions/cartActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./productRight.module.scss";
import { Category, Image, Product, RootState } from "type";
import { isMobile } from "react-device-detect";

interface ProductRightProps {
    listMale: Category[];
    listProMale: Product[];
}

const ProductRight = (props: ProductRightProps) => {
    const listImg = useSelector((state: RootState) => state.image.images);
    var img: Image[] = [];
    if (listImg.Images) {
        img = listImg.Images.filter(
            (value) => value.position === "2" && value.status === "1"
        );
    }
    var [childCateMale, setChildCateMale] = useState<Category[]>([]);
    var [proCateMale, setProCateMale] = useState<Product[]>([]);
    var [count, setCount] = useState(0);
    const dispatch = useDispatch();

    var id = childCateMale[count];

    const formatVND = (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    const notify = () => {
        toast.success("Đã thêm sản phẩm vào giỏ hàng.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleAddCart = (data: any) => {
        data.size = "";
        data.color = "";
        dispatch(addCart(data));
        notify();
    };

    const checkCate = (id: string) => {
        var catArr: string[] = [];
        childCateMale.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        return catArr.toString();
    };

    const checkSlug = (id: string) => {
        var catArr: string[] = [];
        var catslug = "";
        props.listMale.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.slug);
            }
        });
        catArr.forEach((value) => {
            catslug += value + "/";
        });
        return catslug.slice(0, -1);
    };

    const checkImage = (key: number) => {
        let arr: string[] = [];
        proCateMale.forEach((value) => {
            const imageArr = value.image.split(",");
            arr.push(imageArr[0]);
            // for(let i = 0; i< imageArr.length; i++){
            //     console.log(imageArr[i])
            // }
        });
        return arr[key];
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: isMobile ? 1 : 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    useEffect(() => {
        const Male = props.listMale;
        const ProMale = props.listProMale;
        let valueArr: Category[] = [];
        let arr: Product[] = [];
        let proArr: Product[] = [];
        if (Male && ProMale) {
            let parentMale = Male.filter((value) => value.name === "Nam");
            parentMale.forEach((data) => {
                ProMale.forEach((value) => {
                    if (
                        value.categoryId.includes(data._id) &&
                        value.status === "1" &&
                        value.deleted === false
                    ) {
                        arr.push(value);
                    }
                });
                Male.forEach((option) => {
                    if (
                        option.parentCate.includes(data._id) &&
                        option.status === "1" &&
                        option.deleted === false
                    ) {
                        valueArr.push(option);
                    }
                });
            });
        }
        arr.forEach((option) => {
            if (id) {
                if (option.categoryId.includes(id._id)) {
                    proArr.push(option);
                }
            }
        });
        // setProCateMale(Arr);
        setProCateMale(proArr);
        proArr = [];
        setChildCateMale(valueArr);
    }, [props, id]);

    return (
        <section className="man-banner spad">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="filter-control">
                            <ul>
                                {childCateMale.map((value, key) => {
                                    if (key === count) {
                                        return (
                                            <li key={key} className="active">
                                                {value.name}
                                            </li>
                                            // <li key={key} className="active">a</li>
                                        );
                                    } else {
                                        return (
                                            <li
                                                key={key}
                                                onClick={() => setCount(key)}
                                            >
                                                {value.name}
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                        <Slider {...settings}>
                            {proCateMale.slice(0, 5).map((value, key) => {
                                return (
                                    <div
                                        key={key}
                                        className="product-item col-12"
                                    >
                                        <div className="pi-pic">
                                            <img
                                                src={`${
                                                    process.env
                                                        .NEXT_PUBLIC_API_BASE_ENDPOINT
                                                }/products/${checkImage(key)}`}
                                                alt=""
                                            />
                                            {value.priceDiscount !== 0 ? (
                                                <div className="sale">Sale</div>
                                            ) : (
                                                <div></div>
                                            )}

                                            <div className="icon">
                                                <i className="icon_heart_alt"></i>
                                            </div>
                                            <ul>
                                                <li className="w-icon active">
                                                    <a href="/#">
                                                        <i
                                                            onClick={() =>
                                                                handleAddCart({
                                                                    ...value,
                                                                    getQty: 1,
                                                                })
                                                            }
                                                            className="icon_bag_alt"
                                                        ></i>
                                                    </a>
                                                </li>
                                                <li className="quick-view">
                                                    <Link
                                                        href={`/product/${value._id}`}
                                                    >
                                                        <a>+ Quick View</a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="pi-text">
                                            <div className="catagory-name">
                                                {checkCate(value.categoryId)}
                                            </div>
                                            <Link
                                                href={`/product/${value._id}`}
                                            >
                                                <a>
                                                    <h5>{value.name}</h5>
                                                </a>
                                            </Link>
                                            {value.priceDiscount !== 0 ? (
                                                <div className="product-price">
                                                    {formatVND(
                                                        value.priceDiscount
                                                    )}
                                                    <span>
                                                        {" "}
                                                        {formatVND(value.price)}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="product-price">
                                                    {formatVND(value.price)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                    <div className="col-lg-3 offset-lg-1">
                        {img.length !== 0 ? (
                            <div
                                className="product-large set-bg m-large"
                                style={{
                                    backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/images/${img[0].image})`,
                                }}
                            >
                                <h2>{img[0].title}</h2>
                                <a href="/category/nam">Discover More</a>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductRight;
