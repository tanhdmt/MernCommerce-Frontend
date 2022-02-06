import React from "react";
import { Layout } from "@components/Layout";
import HomeScreen from "../src/screens/HomeScreen";
const Home: React.FC = () => {
    return (
        <div>
            <Layout>
                <HomeScreen />
            </Layout>
        </div>
    );
};

export default Home;
