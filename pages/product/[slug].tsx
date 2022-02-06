import React from "react";
import { Layout } from "@components/Layout";
import ProductScreen from "../../src/screens/ProductDetailScreen";
import { useRouter, NextRouter } from "next/router";

const Product: React.FC = () => {
    const router = useRouter();
    const query: any = router.query;
    return (
        <div>
            <Layout>
                <ProductScreen slug={query} />
            </Layout>
        </div>
    );
};

export default Product;
