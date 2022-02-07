/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { addCart } from "../../redux/actions/cartActions";
import Slider from "react-slick";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./productLeftStyle.module.scss";
import { RootState, Image, Category, Product } from "type";

interface ProductLeftProps {
    listFeMale: Category[];
    listProFeMale: Product[];
}

const ProductLeft = (props: ProductLeftProps) => {
    const listImg = useSelector((state: RootState) => state.image.images);
    var img: Image[] = [];
    if (listImg.Images) {
        img = listImg.Images.filter(
            (value) => value.position === "1" && value.status === "1"
        );
    }
    var [childCateFeMale, setChildCateCateFeMale] = useState<Category[]>([]);
    var [proCateFeMale, setProCateFeMale] = useState<Product[]>([]);
    var [count, setCount] = useState(1);
    const dispatch = useDispatch();

    const id = childCateFeMale[count];

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
        childCateFeMale.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        return catArr.toString();
    };

    const checkSlug = (id: string) => {
        var catArr: string[] = [];
        var catSlug = "";

        props.listFeMale.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.slug);
            }
        });

        catArr.forEach((value) => {
            catSlug += value + "/";
        });
        return catSlug.slice(0, -1);
    };

    const checkImage = (key: number) => {
        let arr: string[] = [];
        proCateFeMale.forEach((value) => {
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
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    useEffect(() => {
        const FeMale = props.listFeMale;
        const ProFeMale = props.listProFeMale;
        let parentFeMale: Category[] = [];
        if (FeMale) {
            parentFeMale = FeMale.filter((value) => value.name === "Nữ");
        }
        let valueArr: Category[] = [];
        let arr: Product[] = [];
        let proArr: Product[] = [];
        parentFeMale.forEach((data) => {
            if (FeMale && ProFeMale) {
                ProFeMale.forEach((value) => {
                    if (
                        value.categoryId.includes(data._id) &&
                        value.status === "1" &&
                        value.deleted === false
                    ) {
                        arr.push(value);
                    }
                });
                FeMale.forEach((option) => {
                    if (
                        option.parentCate.includes(data._id) &&
                        option.status === "1" &&
                        option.deleted === false
                    ) {
                        valueArr.push(option);
                    }
                });
            }
        });
        arr.forEach((option) => {
            if (id) {
                if (option.categoryId.includes(id._id)) {
                    proArr.push(option);
                }
            }
        });
        setProCateFeMale(proArr);
        proArr = [];
        setChildCateCateFeMale(valueArr);
    }, [props, id]);

    return (
        <section className="women-banner spad">
            <div className="container-fluid">
                <div className="row">
                    {img.length !== 0 ? (
                        <div className="col-lg-3">
                            <div
                                className="product-large set-bg m-large"
                                style={{
                                    backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/images/${img[0].image})`,
                                }}
                            >
                                <h2>{img[0].title}</h2>
                                <a href="/category/nu">Discover More</a>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className="col-lg-12 ">
                        <div className="filter-control">
                            <ul>
                                {childCateFeMale.map((value, key) => {
                                    if (key === count) {
                                        return (
                                            <li key={key} className="active">
                                                {value.name}
                                            </li>
                                            // <li key={key} className="active">b</li>
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
                            {proCateFeMale.slice(0, 5).map((value, key) => {
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
                                                        + Quick View
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
                                                <h5>{value.name}</h5>
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
                        {/* <div className="product-slider owl-carousel">
                            <div className="product-item">
                                <div className="pi-pic">
                                    <img src="assets/img/products/women-1.jpg" alt="" />
                                    <div className="sale">Sale</div>
                                    <div className="icon">
                                        <i className="icon_heart_alt"></i>
                                    </div>
                                    <ul>
                                        <li className="w-icon active"><a href="/#"><i className="icon_bag_alt"></i></a></li>
                                        <li className="quick-view"><a href="/#">+ Quick View</a></li>
                                        <li className="w-icon"><a href="/#"><i className="fa fa-random"></i></a></li>
                                    </ul>
                                </div>
                                <div className="pi-text">
                                    <div className="catagory-name">Coat</div>
                                    <a href="/#">
                                        <h5>Pure Pineapple</h5>
                                    </a>
                                    <div className="product-price">
                                        $14.00
                                        <span>$35.00</span>
                                    </div>
                                </div>
                            </div>

                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductLeft;
