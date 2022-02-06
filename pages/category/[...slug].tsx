import React from "react";
import { Layout } from "@components/Layout";
import CategoryScreen from "../../src/screens/ProductsScreen";
import { useRouter, NextRouter } from "next/router";

const Category: React.FC = () => {
    const router = useRouter();
    const query: any = router.query;
    return (
        <div>
            <Layout>
                <CategoryScreen slug={query} />
            </Layout>
        </div>
    );
};

export default Category;
