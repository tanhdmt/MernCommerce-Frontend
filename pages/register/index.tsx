import React from "react";
import { Layout } from "@components/Layout";
import RegisterScreen from "../../src/screens/RegisterScreen";

const Register: React.FC = () => {
    return (
        <div>
            <Layout>
                <RegisterScreen />
            </Layout>
        </div>
    );
};

export default Register;
