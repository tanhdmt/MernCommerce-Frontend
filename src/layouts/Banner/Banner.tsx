import React from "react";
import Link from "next/link";
import { Category } from "type";

interface BannerProps {
    listCate: Category[];
}

const Banner = (props: BannerProps) => {
    var listCate: Category[] = [];
    if (props.listCate) {
        listCate = props.listCate.filter((value) => value.parentCate === "");
    }

    return (
        <div className="banner-section spad">
            <div className="container-fluid">
                <div className="row">
                    {listCate.map((value, key) => {
                        return (
                            <div key={key} className="col-lg-4">
                                <Link href={`category/${value.slug}`}>
                                    <a>
                                        <div className="single-banner">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/categories/${value.image}`}
                                                alt=""
                                            />
                                            <div className="inner-text">
                                                <h4>{value.name}</h4>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Banner;
