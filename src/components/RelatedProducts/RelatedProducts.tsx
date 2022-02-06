import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCart } from "../../redux/actions/cartActions";
import { getProducts } from "../../redux/actions/productActions";
import { RootState, Product, Category } from "type";

interface RelatedProductsProps {
    cate: string;
    id: string;
    listCate: Category[];
}

const RelatedProducts = (props: RelatedProductsProps) => {
    const cate = props.cate;
    const id = props.id;
    const listCate = props.listCate;
    const dispatch = useDispatch();
    const lstPro = useSelector(
        (state: RootState) => state.product.products_list
    );

    const router = useRouter();

    var relatedPro: Product[] = [];
    if (lstPro.Products) {
        relatedPro = lstPro.Products.filter(
            (value) =>
                value.categoryId === cate &&
                value._id !== id &&
                value.status === "1"
        );
    }

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
        listCate.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        return catArr.toString();
    };

    const checkSlug = (id: string) => {
        var catArr: string[] = [];
        var catSlug = "";
        listCate.forEach((value) => {
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
        relatedPro.forEach((value) => {
            const imageArr = value.image.split(",");
            arr.push(imageArr[0]);
            // for(let i = 0; i< imageArr.length; i++){
            //     console.log(imageArr[i])
            // }
        });
        return arr[key];
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className="related-products spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Related Products</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {relatedPro.length !== 0 ? (
                        relatedPro.map((value, key) => {
                            return (
                                <div key={key} className="col-lg-3 col-sm-6">
                                    <div className="product-item">
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
                                                    <Link
                                                        href={router.pathname}
                                                    >
                                                        <a>
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
                                                    </Link>
                                                </li>
                                                <li className="quick-view">
                                                    <Link
                                                        href={`/category/${checkSlug(
                                                            value.categoryId
                                                        )}/product/${
                                                            value._id
                                                        }`}
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
                                </div>
                            );
                        })
                    ) : (
                        <h3 style={{ textAlign: "center" }}>
                            No related products{" "}
                        </h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;
