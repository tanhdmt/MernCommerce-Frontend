import React from "react";
import { Layout } from "@components/Layout";
import HomeScreen from "../src/screens/HomeScreen";
import { wrapper } from "../src/store";
import { getRole } from "../src/redux/actions/userActions";
import { getCategories } from "../src/redux/actions/categoryActions";
import { getProducts } from "../src/redux/actions/productActions";
import { AppThunkDispatch, RootState } from "type";
import { useSelector } from "react-redux";

const Home = () => {
    return (
        <div>
            <Layout>
                <HomeScreen />
            </Layout>
        </div>
    );
};
export const getStaticProps = wrapper.getStaticProps((store) =>
    //@ts-ignore
    async ({ preview }) => {
        console.log("getStaticProps on index.tsx has been called.");
        const dispatch = store.dispatch as AppThunkDispatch;
        await dispatch(getCategories());
        await dispatch(getProducts());
    }
);

export default Home;
