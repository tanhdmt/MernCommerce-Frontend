import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "./menuleft.module.scss";
import { Category, Color, Size } from "type";

interface MenuLeftProps {
    listCate: Category[];
    listColor: Color[];
    listSize: Size[];
}

interface CategoryWithChild extends Category {
    grandChildCate: Category[];
}

const MenuLeft = (props: MenuLeftProps) => {
    const router = useRouter();
    const slug = router.query;

    const [match, setMatch] = useState("");
    var arrCate: CategoryWithChild[] = [];
    var [typeCate, setTypeCate] = useState<string | undefined>();
    var [actCate, setActCat] = useState<string>("");
    var [childCate, setChildCate] = useState(arrCate);
    const lstCate = props.listCate;
    const lstColor = props.listColor;
    const lstSize = props.listSize;
    var lstParentCate: Category[] = lstCate?.filter(
        (value) => value.parentCate === "" && value.status === "1"
    );

    const getGrandChild = (id: any, parentType: string | undefined) => {
        const listCateChild: Category[] = [];
        lstCate.forEach((value, key) => {
            if (value.deleted === false && value.status === "1") {
                if (value.parentCate.includes(id)) {
                    if (value.type === parentType || value.type === "0") {
                        listCateChild.push(value);
                    } else if (
                        value.type === "4" &&
                        (parentType === "1" || parentType === "2")
                    ) {
                        listCateChild.push(value);
                    } else if (
                        value.type === "5" &&
                        (parentType === "2" || parentType === "3")
                    ) {
                        listCateChild.push(value);
                    }
                }
            }
        });
        return listCateChild;
    };

    // const handleClick = (data: Category) => {
    //     getGrandChild(data._id, typeCate);
    //     if (grandChildCate.length === 0) {
    //         console.log(data.slug);
    //     }
    // };
    useEffect(() => {
        if (slug?.slug) {
            console.log("slug " + slug.slug[0]);
            slug.slug.indexOf("product") < 0 && setMatch(slug.slug[0]);
        }
    }, [slug]);
    useEffect(() => {
        var idCate = "";
        var arrActCate = "";
        lstParentCate.forEach((value) => {
            if (value.slug === match) {
                arrActCate = value.name;
                idCate = value._id;
                setTypeCate(value.type);
            }
        });
        setActCat(arrActCate);
        if (lstCate) {
            console.log("idCate" + idCate);
            lstCate.forEach((value) => {
                if (
                    value.parentCate.includes(idCate) &&
                    value.deleted === false &&
                    value.status === "1"
                ) {
                    const listChildCates: Category[] = getGrandChild(
                        value._id,
                        typeCate
                    );
                    const categoryWithChild = {
                        ...value,
                        grandChildCate: listChildCates,
                    };
                    console.log("push");
                    console.log(categoryWithChild);
                    arrCate.push(categoryWithChild);
                }
            });
            setChildCate(arrCate);
        }
    }, [lstCate, slug, match]);

    return (
        <>
            <div className="filter-widget">
                <h4 className="fw-title">Categories</h4>
                <ul className="filter-catagories">
                    {lstParentCate.map((cate, key) => {
                        if (cate.slug !== match) {
                            return (
                                <li key={key}>
                                    <Link href={`/category/${cate.slug}`}>
                                        <a>{cate.name}</a>
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
            <div className="filter-widget">
                <h4 className="fw-title">{actCate}</h4>
                {childCate.map((value, key) => {
                    const ddmenu = key + 1;
                    return (
                        <div key={key} className="cate-child">
                            <Link href={`${match}/${value.slug}`}>
                                <a className="collapsed">
                                    <h5
                                        className="cate-name"
                                        // onClick={() => handleClick(value)}
                                    >
                                        {value.name}
                                    </h5>
                                </a>
                            </Link>
                            {value.grandChildCate.length !== 0 && (
                                <ul
                                    id={"ddmenu_" + ddmenu}
                                    className="collapse show dropdown-nav filter-catagories"
                                >
                                    {value.grandChildCate.map((index, key) => {
                                        return (
                                            <li key={key}>
                                                <Link
                                                    href={`${match}/${value.slug}/${index.slug}`}
                                                >
                                                    <a>{index.name}</a>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="filter-widget">
                <h4 className="fw-title">Size</h4>
                <div className="fw-size-choose">
                    {lstSize && lstSize.length !== 0 ? (
                        lstSize.slice(0, 4).map((value, key) => {
                            if (value.deleted === false) {
                                return (
                                    <div key={key} className="sc-item">
                                        <Link
                                            href={`${match}/size/${value.slug}`}
                                        >
                                            <a>
                                                <label htmlFor="s-size">
                                                    {value.name}
                                                </label>
                                            </a>
                                        </Link>
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className="filter-widget">
                <h4 className="fw-title">Color</h4>
                <div className="fw-color-choose">
                    {lstColor && lstColor.length !== 0 ? (
                        lstColor.slice(0, 12).map((value, key) => {
                            if (value.deleted === false) {
                                return (
                                    <div key={key} className="cs-item">
                                        <Link
                                            href={`${match}/color/${value.slug}`}
                                        >
                                            <a>
                                                <div
                                                    className="circle"
                                                    style={{
                                                        background: value.code,
                                                    }}
                                                ></div>
                                                <div className="name-color">
                                                    {value.name}
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
};

export default MenuLeft;
