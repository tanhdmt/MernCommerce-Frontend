import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../layouts/Hero/Hero";
import Banner from "../layouts/Banner/Banner";
import ProductLeft from "../components/ProductLeft/ProductLeft";
import DealWeek from "../components/DealWeek/DealWeek";
import ProductRight from "../components/ProductRight/ProductRight";
import Insta from "../layouts/Insta/Insta";
import { getRole } from "../redux/actions/userActions";
import { RootState } from "type";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const lstCate = useSelector(
        (state: RootState) => state.category.categories
    );
    const lstPro = useSelector(
        (state: RootState) => state.product.products_list
    );
    const [userInfo, setUserInfo] = useState<string | null>(null);

    useEffect(() => {
        if (localStorage) {
            const localUserInfo = localStorage.getItem("userInfo");
            setUserInfo(localUserInfo);
        }
    }, []);
    const id = userInfo ? JSON.parse(userInfo)._id : null;
    useEffect(() => {
        if (!window.location.hash) {
            window.location.href = window.location + "#home";
            window.location.reload();
        }
        if (id) dispatch(getRole(id));
    }, [id, dispatch]);
    return (
        <div>
            <Hero />
            <Banner listCate={lstCate.Categories} />
            <ProductLeft
                listFeMale={lstCate.Categories}
                listProFeMale={lstPro.Products}
            />
            <DealWeek />
            <ProductRight
                listMale={lstCate.Categories}
                listProMale={lstPro.Products}
            />
            <Insta />
        </div>
    );
};

export default HomeScreen;
