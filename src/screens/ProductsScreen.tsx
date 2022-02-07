import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import Pagination from "react-js-pagination";
import MenuLeft from "../components/MenuLeft/MenuLeft";
import { getCategories } from "../redux/actions/categoryActions";
import {
    getColors,
    getProducts,
    getSizes,
} from "../redux/actions/productActions";
import { addCart } from "../redux/actions/cartActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product, RootState } from "type";

interface ProductScreenProps {
    slug: {
        slug: string[] | string;
    };
}

const ProductsScreen = (props: ProductScreenProps) => {
    const dispatch = useDispatch();
    const lstCate = useSelector(
        (state: RootState) => state.category.categories
    );
    const lstColor = useSelector(
        (state: RootState) => state.product.colors_list
    );
    const lstSize = useSelector((state: RootState) => state.product.sizes_list);
    const lstPro = useSelector(
        (state: RootState) => state.product.products_list
    );
    const router: NextRouter = useRouter();
    const { slug } = props;

    const match1 = slug?.slug instanceof Array ? slug?.slug[0] : slug?.slug;
    const match2 = slug?.slug instanceof Array ? slug?.slug[1] : false;
    const match3 = slug?.slug instanceof Array ? slug?.slug[2] : false;
    const match4 =
        slug?.slug instanceof Array
            ? slug?.slug?.indexOf("search") >= 0
            : false;

    var showPro: Product[] = [];

    if (lstPro.Products) {
        if (match2 && !match3) {
            const catSlug = lstCate.Categories.filter(
                (value) => value.slug === match1
            );
            const catSlug2 = lstCate.Categories.filter(
                (value) => value.slug === match2
            );
            let proSlug1: Product[] = [];
            if (catSlug && catSlug2) {
                catSlug.forEach((value) => {
                    lstPro.Products.forEach((index) => {
                        if (
                            index.categoryId.includes(value._id) &&
                            index.status === "1"
                        ) {
                            proSlug1.push(index);
                        }
                    });
                });
                catSlug2.forEach((value) => {
                    proSlug1.forEach((index) => {
                        if (index.categoryId.includes(value._id)) {
                            showPro.push(index);
                        }
                    });
                });
            }
        } else if (match3) {
            if (match2 === "size") {
                const catSlug = lstCate.Categories.filter(
                    (value) => value.slug === match1
                );
                const sizeSlug3 = lstSize.Sizes.filter(
                    (value) => value.slug === match3
                );
                let proSlug1: Product[] = [];

                if (catSlug && sizeSlug3) {
                    catSlug.forEach((value) => {
                        lstPro.Products.forEach((index) => {
                            if (
                                index.categoryId.includes(value._id) &&
                                index.status === "1"
                            ) {
                                proSlug1.push(index);
                            }
                        });
                    });

                    sizeSlug3.forEach((value) => {
                        proSlug1.forEach((index) => {
                            if (index.size.includes(value._id)) {
                                showPro.push(index);
                            }
                        });
                    });
                }
            } else if (match2 === "color") {
                const catSlug = lstCate.Categories.filter(
                    (value) => value.slug === match1
                );
                const colorSlug3 = lstColor.Colors.filter(
                    (index) => index.slug === match3
                );
                let proSlug1: Product[] = [];

                if (catSlug && colorSlug3) {
                    catSlug.forEach((value) => {
                        lstPro.Products.forEach((index) => {
                            if (
                                index.categoryId.includes(value._id) &&
                                index.status === "1"
                            ) {
                                proSlug1.push(index);
                            }
                        });
                    });

                    colorSlug3.forEach((value) => {
                        proSlug1.forEach((index) => {
                            if (index.color.includes(value._id)) {
                                showPro.push(index);
                            }
                        });
                    });
                }
            } else {
                if (lstCate.Categories) {
                    const catSlug = lstCate.Categories.filter(
                        (value) => value.slug === match1
                    );
                    const catSlug2 = lstCate.Categories.filter(
                        (value) => value.slug === match2
                    );
                    const catSlug3 = lstCate.Categories.filter(
                        (value) => value.slug === match3
                    );
                    let proSlug1: Product[] = [];
                    let proSlug2: Product[] = [];

                    catSlug.forEach((value) => {
                        lstPro.Products.forEach((index) => {
                            if (
                                index.categoryId.includes(value._id) &&
                                index.status === "1"
                            ) {
                                proSlug1.push(index);
                            }
                        });
                    });
                    catSlug2.forEach((value) => {
                        proSlug1.forEach((index) => {
                            if (index.categoryId.includes(value._id)) {
                                proSlug2.push(index);
                            }
                        });
                    });
                    catSlug3.forEach((value) => {
                        proSlug2.forEach((index) => {
                            if (index.categoryId.includes(value._id)) {
                                showPro.push(index);
                            }
                        });
                    });
                }
            }
        } else if (match1) {
            const catSlug = lstCate.Categories.filter(
                (value) => value.slug === match1
            );

            catSlug.forEach((value) => {
                lstPro.Products.forEach((index) => {
                    if (index.categoryId.includes(value._id)) {
                        showPro.push(index);
                    }
                });
            });
        } else if (match4) {
            console.log(true);
        }
    }

    const [activePage, setCurrentPage] = useState(1);

    const indexOfLastTodo = activePage * 12;

    const indexOfFirstTodo = indexOfLastTodo - 12;

    const currentTodos = showPro
        .reverse()
        .slice(indexOfFirstTodo, indexOfLastTodo);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const formatVND = (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    const checkCate = (id: string) => {
        var catArr: string[] = [];
        lstCate.Categories.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        if (catArr.length === 3) {
            return catArr[2].toString();
        } else if (catArr.length === 2) {
            return catArr[1].toString();
        }
    };

    const checkSlug = (id: string) => {
        var catArr: string[] = [];
        var catslug = "";
        lstCate.Categories.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.slug);
            }
        });
        catArr.forEach((value) => {
            catslug += value + "/";
        });
        return catslug.slice(0, -1);
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

    const checkImage = (key: number) => {
        let arr: string[] = [];
        currentTodos.forEach((value) => {
            const imageArr = value.image.split(",");
            arr.push(imageArr[0]);
        });
        return arr[key];
    };

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
        dispatch(getColors());
        dispatch(getSizes());
    }, [dispatch]);

    return (
        <div>
            {/* -- Breadcrumb Section Begin -- */}
            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <a href="/#">
                                    <i className="fa fa-home"></i> Home
                                </a>
                                <span>Shop</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* -- Breadcrumb Section End -- */}
            {/* -- Product Shop Section Begin -- */}
            <section className="product-shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
                            <MenuLeft
                                listCate={lstCate.Categories}
                                listColor={lstColor.Colors}
                                listSize={lstSize.Sizes}
                            />
                        </div>
                        <div className="col-lg-9 order-1 order-lg-2">
                            <div className="product-list">
                                <div className="row">
                                    {currentTodos.length !== 0 ? (
                                        currentTodos.map((value, key) => {
                                            return (
                                                <div
                                                    key={key}
                                                    className="col-lg-4 col-sm-6"
                                                >
                                                    <div className="product-item">
                                                        <div className="pi-pic">
                                                            <img
                                                                src={`${
                                                                    process.env
                                                                        .NEXT_PUBLIC_API_BASE_ENDPOINT
                                                                }/products/${checkImage(
                                                                    key
                                                                )}`}
                                                                alt=""
                                                            />
                                                            {value.priceDiscount !==
                                                            0 ? (
                                                                <div className="sale pp-sale">
                                                                    Sale
                                                                </div>
                                                            ) : (
                                                                <div></div>
                                                            )}
                                                            <div className="icon">
                                                                <i className="icon_heart_alt"></i>
                                                            </div>
                                                            <ul>
                                                                <li className="w-icon active">
                                                                    <a href="javascript:void(0);">
                                                                        <i
                                                                            onClick={() =>
                                                                                handleAddCart(
                                                                                    {
                                                                                        ...value,
                                                                                        getQty: 1,
                                                                                    }
                                                                                )
                                                                            }
                                                                            className="icon_bag_alt"
                                                                        ></i>
                                                                    </a>
                                                                </li>
                                                                <li className="quick-view">
                                                                    <Link
                                                                        href={`/category/${checkSlug(
                                                                            value.categoryId
                                                                        )}/product/${
                                                                            value._id
                                                                        }`}
                                                                    >
                                                                        <a>
                                                                            +
                                                                            Quick
                                                                            View
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                                {/* <li className="w-icon"><a href="/#"><i className="fa fa-random"></i></a></li> */}
                                                            </ul>
                                                        </div>
                                                        <div className="pi-text">
                                                            <div className="catagory-name">
                                                                {checkCate(
                                                                    value.categoryId
                                                                )}
                                                            </div>

                                                            <Link
                                                                href={`/product/${value._id}`}
                                                            >
                                                                <a>
                                                                    <h5>
                                                                        {
                                                                            value.name
                                                                        }
                                                                    </h5>
                                                                </a>
                                                            </Link>
                                                            {value.priceDiscount !==
                                                            0 ? (
                                                                <div className="product-price">
                                                                    {formatVND(
                                                                        value.priceDiscount
                                                                    )}
                                                                    <span>
                                                                        {" "}
                                                                        {formatVND(
                                                                            value.price
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <div className="product-price">
                                                                    {formatVND(
                                                                        value.price
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div>
                                            <h1>No Product</h1>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="loading-more">
                                <Pagination
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={activePage}
                                    itemsCountPerPage={12}
                                    totalItemsCount={showPro.length}
                                    pageRangeDisplayed={5}
                                    onChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* -- Product Shop Section End -- */}
        </div>
    );
};

export default ProductsScreen;
