import React from "react";
import { Layout } from "@components/Layout";
import ContactScreen from "../../src/screens/ContactScreen";

const Contact: React.FC = () => {
    return (
        <div>
            <Layout>
                <ContactScreen />
            </Layout>
        </div>
    );
};

export default Contact;
