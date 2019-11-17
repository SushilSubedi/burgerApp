import * as actionType from '../action/actionType';

const initState={
    orders:[],
    loading:false,
    purchased:false
}

const reducer=(state=initState,action)=>{
switch(action.type){
    case actionType.PURCHASE_BURGER_INIT:
        return{
            ...state,
            purchased:false
                }

    case actionType.PURCHASE_BURGER_START:
        return{
            ...state,
            loading:true
        }

    case actionType.PURCHASE_BURGER_SUCCESS:
        const newOrder={
            ...action.orderData,
            id:action.orderId
        }
        return{
            ...state,
            purchased:true,
            loading:false,
            orders:state.orders.concat(newOrder)
            
        }
        case actionType.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading:false
            }
            case actionType.FETCH_ORDER_START:
                return{
                    ...state,
                    loading:true
                }
            case actionType.FETCH_ORDER_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    orders:action.orders
                }
            case actionType.FETCH_ORDER_FAIL:
                return{
                    ...state,
                    loading:false
                }

            default:
                return state;
}

}
export default reducer;