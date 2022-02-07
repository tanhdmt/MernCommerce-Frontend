import React from "react";
import { Layout } from "@components/Layout";
import CheckOutScreen from "../../../src/screens/CheckOutScreen";

const Checkout: React.FC = () => {
    return (
        <div>
            <Layout>
                <CheckOutScreen />
            </Layout>
        </div>
    );
};

export default Checkout;
