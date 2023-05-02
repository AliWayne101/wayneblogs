import React from 'react'
import { ImSad } from 'react-icons/im';

const Error = ({ text }: { text: string }) => {
    return (
        <div className="err-box">
            <ImSad size={200} color='var(--theme-color)' />
            <span>{text}</span>
        </div>
    )
}

export default Error