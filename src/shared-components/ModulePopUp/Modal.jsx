import React from 'react'
const style = {
    
}

 const Modal= (props) => {
    if(props.show){
        return (
            <div className="universalModal">
                <div className="content"> 
                     {props.hide && <button onClick={props.hide}>X</button>}
                    {props.children}
                </div>
            </div>
        )
    }else {
        return null
    }
}

export default Modal