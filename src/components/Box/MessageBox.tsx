import React from "react";
import styles from "./messageBox.module.scss";

interface MessageBoxProps {
    variant: string;
    children: any;
}

const MessageBox = (props: MessageBoxProps) => {
    return (
        <div
            className={`alert ${styles.alert} alert-${
                props.variant || "info"
            } ${styles['alert-${props.variant || "info"}']}`}
        >
            {props.children}
        </div>
    );
};
export default MessageBox;
