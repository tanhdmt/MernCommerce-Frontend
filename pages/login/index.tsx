import React from "react";
import { Layout } from "@components/Layout";
import LoginScreen from "../../src/screens/LoginScreen";

const Login: React.FC = () => {
    return (
        <div>
            <Layout>
                <LoginScreen />
            </Layout>
        </div>
    );
};

export default Login;
