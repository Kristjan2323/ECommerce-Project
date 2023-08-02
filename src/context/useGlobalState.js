import { useState } from "react";

const useGlobalState = () =>{
    const [cart, setCart] = useState([])
    const [qty,setQty] = useState(0)
    const [showCart, setShowCart] = useState(false)
    const [showPayment, setShowPayment] = useState(false)

    const actions = (action) => {
        const {type, payload} = action;
        switch (type){
            case 'setCart':
                return setCart(payload);
                case 'setQty':
                    return setQty(payload);
                    case 'setShowCart':
                        return setShowCart(payload)
                        case 'setShowPayment':
                            return setShowPayment(payload)
            default:
                return cart,qty,showCart,showPayment
        }
        
    }
    return {cart,qty,showCart,showPayment, actions}
}

export default useGlobalState;