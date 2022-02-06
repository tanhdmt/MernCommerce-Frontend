import React from 'react'
import './style.scss'

interface MessageBoxProps {
    variant: string;
    children: any;
}

const MessageBox = (props: MessageBoxProps) => {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>
            {props.children}
        </div>
    )
}
export default MessageBox
