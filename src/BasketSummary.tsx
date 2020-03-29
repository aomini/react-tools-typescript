import React from 'react'

interface IProps {
    count : number
}

export const BasketSummary : React.FC<IProps> = (props) => {
    return (
        <div className="basket-summary">
            {props.count}            
        </div>
    )
}
