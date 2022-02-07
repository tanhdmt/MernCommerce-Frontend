import React from "react";
import { Layout } from "@components/Layout";
import CartScreen from "../../src/screens/CartScreen";

const Cart: React.FC = () => {
    return (
        <div>
            <Layout>
                <CartScreen />
            </Layout>
        </div>
    );
};

export default Cart;
