import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const Loading = () => {
    return (
        <div className="loading-box">
            <ClipLoader
                color="#cc26a8"
                loading
                size={200}
            />
            <span>Please Wait...</span>
        </div>
    )
}

export default Loading