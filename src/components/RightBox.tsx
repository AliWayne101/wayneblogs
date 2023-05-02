import React from 'react'
import Button from './Button'


interface Props {
    title: string,
    buttons: string[]
}

const RightBox = ({title, buttons}: Props) => {
    return (
        <div className="body-container-right-top">
            <span>{title}</span>
            <div className="body-container-right-top-buttons">
                {buttons.map((data, index)=> (
                    <Button text={data} link={`/category/${data}`} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default RightBox