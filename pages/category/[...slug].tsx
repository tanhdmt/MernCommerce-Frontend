import React from "react";
import { Layout } from "@components/Layout";
import CategoryScreen from "../../src/screens/ProductsScreen";
import { useRouter, NextRouter } from "next/router";
import { wrapper } from "src/store";
import { getCategories } from "src/redux/actions/categoryActions";
import {
    getColors,
    getProducts,
    getSizes,
} from "src/redux/actions/productActions";
import { AppThunkDispatch } from "type";

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

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req }) => {
            const dispatch = store.dispatch as AppThunkDispatch;
            await dispatch(getCategories());
            await dispatch(getProducts());
            await dispatch(getColors());
            await dispatch(getSizes());
        }
);
export default Category;
