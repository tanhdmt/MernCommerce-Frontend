import React from "react";
import { Layout } from "@components/Layout";
import OrderScreen from "../../src/screens/OrderScreen";
import { useRouter, NextRouter } from "next/router";

const Order: React.FC = () => {
    const router = useRouter();
    const query: any = router.query;
    return (
        <div>
            <Layout>
                <OrderScreen slug={query} />
            </Layout>
        </div>
    );
};

export default Order;
