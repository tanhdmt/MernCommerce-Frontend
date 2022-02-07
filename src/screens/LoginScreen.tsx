import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form, FastField } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../components/InputField/InputField";
import { login } from "../redux/actions/userActions";
import { RootState } from "type";

const LoginScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const failMess = useSelector(
        (state: RootState) => state.user.message_login_fail
    );

    const initialValues = {
        email: "",
        password: "",
    };
    const [isLogged, setIsLogged] = useState(false);

    const [messageUserError, setMessageUserError] = useState<string | null>();

    useEffect(() => {
        const localUserInfo = localStorage
            ? localStorage.getItem("userInfo")
            : null;
        setIsLogged(localUserInfo && JSON.parse(localUserInfo) ? true : false);
        setMessageUserError(
            localStorage ? localStorage.getItem("message-user_error") : ""
        );
    }, []);

    useEffect(() => {
        const notify = () =>
            messageUserError &&
            toast.error(JSON.parse(messageUserError).message);
        const clearMess = () => {
            localStorage.removeItem("message-user_error");
        };
        document.title = "Customer Login";
        if (messageUserError && failMess) {
            notify();
            setTimeout(clearMess, 5000);
        } else {
            clearTimeout();
        }
    }, [failMess]);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Bạn phải nhập email"),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Ít nhất 8 kí tự, gồm chữ HOA, chữ thường, số và kí tự đặc biệt"
            )
            .required("Bạn phải nhập Mật khẩu"),
    });

    useEffect(() => {
        document.title = "Customer Login";
        if (isLogged) {
            router.push("/");
        }
    }, [isLogged, router]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(
                    login({
                        email: values.email,
                        password: values.password,
                    })
                );
            }}
        >
            {(FormikProps) => {
                return (
                    <div className="register-login-section spad">
                        <ToastContainer />
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 offset-lg-3">
                                    <div className="login-form">
                                        <h2>Login</h2>
                                        <Form>
                                            <FastField
                                                type="email"
                                                name="email"
                                                className="group-input"
                                                component={InputField}
                                                id="email"
                                                placeholder="Input email"
                                            />

                                            <FastField
                                                type="password"
                                                name="password"
                                                className="group-input"
                                                component={InputField}
                                                id="password"
                                                placeholder="Input password"
                                            />
                                            <div className="group-input gi-check">
                                                <div className="gi-more">
                                                    <label htmlFor="save-pass">
                                                        Save Password
                                                        <input
                                                            type="checkbox"
                                                            id="save-pass"
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <a
                                                        href="/#"
                                                        className="forget-pass"
                                                    >
                                                        Forget your Password
                                                    </a>
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="site-btn login-btn"
                                            >
                                                Sign In
                                            </button>
                                        </Form>
                                        <div className="switch-login">
                                            <Link href="/register">
                                                <a className="or-login">
                                                    Or Create An Account
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};

export default LoginScreen;
