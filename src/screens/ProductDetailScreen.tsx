import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuLeft from "../components/MenuLeft/MenuLeft";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import { getCategories } from "../redux/actions/categoryActions";
import { addCart } from "../redux/actions/cartActions";
import {
    getColors,
    getProduct,
    getSizes,
} from "../redux/actions/productActions";
import { RootState } from "type";

interface ProductDetailScreen {
    slug: {
        slug: string;
    };
}

const ProductDetailScreen = (props: ProductDetailScreen) => {
    const dispatch = useDispatch();
    //let { url } = useRouteMatch();
    const router = useRouter();
    const id = props.slug.slug;
    const product = useSelector((state: RootState) => state.product.product);
    const lstCate = useSelector(
        (state: RootState) => state.category.categories
    );
    const lstColor = useSelector(
        (state: RootState) => state.product.colors_list
    );
    const lstSize = useSelector((state: RootState) => state.product.sizes_list);
    var [count, setCount] = useState(0);
    const [sizeAct, setSizeAct] = useState<number>();
    const [sizes, setSizes] = useState("");
    const [colorAct, setColorAct] = useState<number>();
    const [colors, setColors] = useState("");
    const [quantityPro, setQuantityPro] = useState("");
    var cate = product.categoryId;

    // const image = product.image.split(',');

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    const notifySuccess = () => {
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

    const notifyErrorSize = () => {
        toast.error("Bạn cần chọn size trước khi thêm sản phẩm vào giỏ hàng.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const notifyErrorColor = () => {
        toast.error("Bạn cần chọn màu trước khi thêm sản phẩm vào giỏ hàng.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleClickSize = (key: number, value: string) => {
        setSizeAct(key);
        setSizes(value);
    };

    const handleClickColor = (key: number, value: string) => {
        setColorAct(key);
        setColors(value);
    };

    const handleAddCart = (data: any) => {
        if (data.color.length === 0) {
            notifyErrorColor();
        } else if (data.size.length === 0) {
            notifyErrorSize();
        } else {
            dispatch(addCart(data));
            notifySuccess();
        }
    };

    const formatVND = (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    const checkMultiCate = (id: string) => {
        var catArr: string[] = [];
        if (id && lstCate.Categories) {
            lstCate.Categories.forEach((value) => {
                if (id.includes(value._id)) {
                    catArr.push(value.name);
                }
            });
        }
        return catArr.toString();
    };

    const checkSingleCate = (id: string) => {
        var catArr: string[] = [];
        if (id && lstCate.Categories) {
            lstCate.Categories.forEach((value) => {
                if (id.includes(value._id)) {
                    catArr.push(value.name);
                }
            });
        }
        if (catArr.length === 3) {
            return catArr[2].toString();
        } else if (catArr.length === 2) {
            return catArr[1].toString();
        }
    };

    const checkColor = (id: string) => {
        var color: string = "";
        if (id && lstColor.Colors) {
            const infoColor = lstColor.Colors.find((item) => {
                return id == item._id;
            });
            if (infoColor) color = infoColor.code;
        }
        return color;
    };

    const checkSize = (id: string) => {
        var sizeArr: string[] = [];
        if (id && lstSize.Sizes) {
            lstSize.Sizes.forEach((value) => {
                if (value._id.includes(id)) {
                    sizeArr.push(value.name);
                }
            });
        }
        return sizeArr;
    };

    useEffect(() => {
        dispatch(getProduct(id));
        dispatch(getCategories());
        dispatch(getColors());
        dispatch(getSizes());
    }, [dispatch, id]);
    return (
        <div>
            {/* Breadcrumb Section Begin */}
            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text product-more">
                                <Link href="/">
                                    <a>
                                        <i className="fa fa-home" /> Home
                                    </a>
                                </Link>
                                <a href="javascript:void(0)">Shop</a>
                                <span>Detail</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Breadcrumb Section Begin */}
            {/* Product Shop Section Begin */}
            <section className="product-shop spad page-details">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="product-pic-zoom">
                                        <div className="product-pic-zoom">
                                            {product.image ? (
                                                <img
                                                    className="product-big-img"
                                                    src={`${
                                                        process.env
                                                            .NEXT_PUBLIC_API_BASE_ENDPOINT
                                                    }/products/${
                                                        product.image.split(
                                                            ","
                                                        )[count]
                                                    }`}
                                                    alt=""
                                                />
                                            ) : (
                                                <img
                                                    className="product-big-img"
                                                    src="https://admin-demo.nopcommerce.com/images/thumbs/default-image_100.png"
                                                    alt=""
                                                />
                                            )}
                                            {/* <div className="zoom-icon">
                                                <i className="fa fa-search-plus"></i>
                                            </div> */}
                                        </div>
                                        {/* <div className="zoom-icon">
                                            <i className="fa fa-search-plus" />
                                        </div> */}
                                    </div>
                                    <div className="product-thumbs">
                                        <Carousel
                                            swipeable={false}
                                            draggable={false}
                                            showDots={true}
                                            responsive={responsive}
                                            ssr={true} // means to render carousel on server-side.
                                            infinite={true}
                                            autoPlay={true}
                                            autoPlaySpeed={5000}
                                            keyBoardControl={true}
                                            customTransition="all .5"
                                            transitionDuration={500}
                                            containerClass="carousel-container"
                                            removeArrowOnDeviceType={[
                                                "tablet",
                                                "mobile",
                                            ]}
                                            // deviceType={this.props.deviceType}
                                            dotListClass="custom-dot-list-style"
                                            itemClass="carousel-item-padding-40-px"
                                        >
                                            {product.image ? (
                                                product.image
                                                    .split(",")
                                                    .map((value, key) => {
                                                        return (
                                                            <div
                                                                key={key}
                                                                className="pt col-12"
                                                                onClick={() =>
                                                                    setCount(
                                                                        key
                                                                    )
                                                                }
                                                            >
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/products/${value}`}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        );
                                                    })
                                            ) : (
                                                <div className="pt">
                                                    <img
                                                        src="https://admin-demo.nopcommerce.com/images/thumbs/default-image_100.png"
                                                        alt=""
                                                    />
                                                </div>
                                            )}
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="product-details">
                                        <div className="pd-title">
                                            <span>
                                                {checkSingleCate(
                                                    product.categoryId
                                                )}
                                            </span>
                                            <h3>{product.name}</h3>
                                            <a href="/#" className="heart-icon">
                                                <i className="icon_heart_alt" />
                                            </a>
                                        </div>
                                        <div className="pd-rating">
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star-o" />
                                            <span>(5)</span>
                                        </div>
                                        <div className="pd-desc">
                                            {product.priceDiscount !== 0 ? (
                                                <h4 className="product-price">
                                                    {formatVND(
                                                        product.priceDiscount
                                                    )}
                                                    <span>
                                                        {" "}
                                                        {formatVND(
                                                            product.price
                                                        )}
                                                    </span>
                                                </h4>
                                            ) : (
                                                <h4 className="product-price">
                                                    {formatVND(product.price)}
                                                </h4>
                                            )}
                                        </div>
                                        <div className="pd-color">
                                            <h6>Color</h6>
                                            {/* <div className="circle" style={{ background: value.code }}></div> */}
                                            <div className="pd-color-choose">
                                                {product.color ? (
                                                    product.color
                                                        .split(",")
                                                        .map((value, key) => {
                                                            return (
                                                                <div
                                                                    key={key}
                                                                    className="cc-item"
                                                                >
                                                                    {colorAct ===
                                                                    key ? (
                                                                        <div
                                                                            className="circle_active"
                                                                            style={{
                                                                                background:
                                                                                    checkColor(
                                                                                        value
                                                                                    ),
                                                                            }}
                                                                        ></div>
                                                                    ) : (
                                                                        <div
                                                                            className="circle"
                                                                            onClick={() =>
                                                                                handleClickColor(
                                                                                    key,
                                                                                    value
                                                                                )
                                                                            }
                                                                            style={{
                                                                                background:
                                                                                    checkColor(
                                                                                        value
                                                                                    ),
                                                                            }}
                                                                        ></div>
                                                                    )}
                                                                </div>
                                                            );
                                                            //circle_active
                                                        })
                                                ) : (
                                                    <div className="cc-item">
                                                        <div
                                                            className="circle"
                                                            style={{
                                                                background:
                                                                    product.color,
                                                            }}
                                                        ></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="pd-size-choose">
                                            {product.size ? (
                                                product.size
                                                    .split(",")
                                                    .map((value, key) => {
                                                        return (
                                                            <div
                                                                key={key}
                                                                className="sc-item"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    id="sm-size"
                                                                />
                                                                {sizeAct ===
                                                                key ? (
                                                                    <label
                                                                        className="active"
                                                                        htmlFor="sm-size"
                                                                    >
                                                                        {checkSize(
                                                                            value
                                                                        )}
                                                                    </label>
                                                                ) : (
                                                                    <label
                                                                        onClick={() =>
                                                                            handleClickSize(
                                                                                key,
                                                                                value
                                                                            )
                                                                        }
                                                                        htmlFor="sm-size"
                                                                    >
                                                                        {checkSize(
                                                                            value
                                                                        )}
                                                                    </label>
                                                                )}
                                                            </div>
                                                        );
                                                    })
                                            ) : (
                                                <div className="sc-item">
                                                    <input
                                                        type="radio"
                                                        id="sm-size"
                                                    />
                                                    <label htmlFor="sm-size"></label>
                                                </div>
                                            )}
                                        </div>
                                        {product.quantity > 0 ? (
                                            <div className="quantity">
                                                <div className="pro-qty">
                                                    <input
                                                        type="number"
                                                        defaultValue={1}
                                                        min={1}
                                                        max={product.quantity}
                                                        onChange={(e) =>
                                                            setQuantityPro(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <a
                                                    href="javascript:void(0);"
                                                    onClick={() =>
                                                        handleAddCart({
                                                            ...product,
                                                            size: sizes,
                                                            color: colors,
                                                            getQty: Number(
                                                                quantityPro
                                                            ),
                                                        })
                                                    }
                                                    className="primary-btn pd-cart"
                                                >
                                                    Add To Cart
                                                </a>
                                            </div>
                                        ) : (
                                            <div className="quantity">
                                                <h3 className="danger-btn pd-cart">
                                                    Unavailable
                                                </h3>
                                            </div>
                                        )}
                                        <ul className="pd-tags">
                                            <li>
                                                <span>CATEGORIES</span>:{" "}
                                                {checkMultiCate(
                                                    product.categoryId
                                                )}
                                            </li>
                                            {/* <li>
                                                <span>TAGS</span>: Clothing, T-shirt, Woman
                                            </li> */}
                                        </ul>
                                        {/* <div className="pd-share">
                                            <div className="p-code">Sku : 00012</div>
                                            <div className="pd-social">
                                                <a href="/#">
                                                    <i className="ti-facebook" />
                                                </a>
                                                <a href="/#">
                                                    <i className="ti-twitter-alt" />
                                                </a>
                                                <a href="/#">
                                                    <i className="ti-linkedin" />
                                                </a>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="product-tab">
                                <div className="tab-item">
                                    <ul className="nav" role="tablist">
                                        <li className="col-lg-4">
                                            <a
                                                className="active col-lg-12"
                                                data-toggle="tab"
                                                href="#tab-1"
                                                role="tab"
                                            >
                                                DESCRIPTION
                                            </a>
                                        </li>
                                        <li className="col-lg-4">
                                            <a
                                                className="col-lg-12"
                                                data-toggle="tab"
                                                href="#tab-2"
                                                role="tab"
                                            >
                                                SPECIFICATIONS
                                            </a>
                                        </li>
                                        <li className="col-lg-4">
                                            <a
                                                className="col-lg-12"
                                                data-toggle="tab"
                                                href="#tab-3"
                                                role="tab"
                                            >
                                                Customer Reviews (02)
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-item-content">
                                    <div className="tab-content">
                                        <div
                                            className="tab-pane fade-in active"
                                            id="tab-1"
                                            role="tabpanel"
                                        >
                                            <div className="product-content">
                                                <div className="row">
                                                    <div
                                                        className="col-lg-12"
                                                        dangerouslySetInnerHTML={{
                                                            __html: product.details,
                                                        }}
                                                    />
                                                    {/* <div className="col-lg-5">
                                                        <img src="img/product-single/tab-desc.jpg" alt="" />
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="tab-2"
                                            role="tabpanel"
                                        >
                                            <div className="specification-table">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className="p-catagory">
                                                                Customer Rating
                                                            </td>
                                                            <td>
                                                                <div className="pd-rating">
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star-o" />
                                                                    <span>
                                                                        (5)
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-catagory">
                                                                Price
                                                            </td>
                                                            <td>
                                                                <div className="p-price">
                                                                    {formatVND(
                                                                        product.price
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-catagory">
                                                                Availability
                                                            </td>
                                                            <td>
                                                                <div className="p-stock">
                                                                    {
                                                                        product.quantity
                                                                    }{" "}
                                                                    in stock
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="tab-3"
                                            role="tabpanel"
                                        >
                                            <div className="customer-review-option">
                                                <h4>2 Comments</h4>
                                                <div className="comment-option">
                                                    <div className="co-item">
                                                        <div className="avatar-pic">
                                                            <img
                                                                src="assets/img/product-single/avatar-1.png"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="avatar-text">
                                                            <div className="at-rating">
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star-o" />
                                                            </div>
                                                            <h5>
                                                                Brandon Kelley{" "}
                                                                <span>
                                                                    27 Aug 2019
                                                                </span>
                                                            </h5>
                                                            <div className="at-reply">
                                                                Nice !
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="co-item">
                                                        <div className="avatar-pic">
                                                            <img
                                                                src="assets/img/product-single/avatar-2.png"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="avatar-text">
                                                            <div className="at-rating">
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star-o" />
                                                            </div>
                                                            <h5>
                                                                Roy Banks{" "}
                                                                <span>
                                                                    27 Aug 2019
                                                                </span>
                                                            </h5>
                                                            <div className="at-reply">
                                                                Nice !
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="personal-rating">
                                                    <h6>Your Ratind</h6>
                                                    <div className="rating">
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star-o" />
                                                    </div>
                                                </div>
                                                <div className="leave-comment">
                                                    <h4>Leave A Comment</h4>
                                                    <form
                                                        action="#"
                                                        className="comment-form"
                                                    >
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Name"
                                                                />
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Email"
                                                                />
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <textarea
                                                                    placeholder="Messages"
                                                                    defaultValue={
                                                                        ""
                                                                    }
                                                                />
                                                                <button
                                                                    type="submit"
                                                                    className="site-btn"
                                                                >
                                                                    Send message
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Product Shop Section End */}
            {/* Related Products Section End */}
            <RelatedProducts
                listCate={lstCate.Categories}
                id={id}
                cate={cate}
            />
        </div>
    );
};

export default ProductDetailScreen;
