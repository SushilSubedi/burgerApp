import * as actionType from './actionType';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess=(id,orderData)=>{
return{
    type:actionType.PURCHASE_BURGER_SUCCESS,
    orderId:id,
    orderData:orderData
}
};

export const purchaseBurgerFail=(error)=>{
    return{
        type:actionType.PURCHASE_BURGER_FAIL,
        error:error
    }
    };

export const purchaseBurgerStart=()=>{
    return{
        type:actionType.PURCHASE_BURGER_START
    }
}

export const purchaseBurger=(orderData,token)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData).then(response=>{
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
          }).catch(error=>{
            dispatch(purchaseBurgerFail(error));
          })
    }
}

export const fetchOrderStart=()=>{
    return{
        type:actionType.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess=(orders)=>{
    return{
        type:actionType.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}

export const fetchOrderFail=(error)=>{
    return{
        type:actionType.FETCH_ORDER_FAIL,
        error:error
    }
}

export const fetchOrder=(token,userId)=>{
    return dispatch=>{
        const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        dispatch(fetchOrderStart());
        axios.get('/orders.json'+queryParams).then(res=>{
            const FetchOrder=[];
            console.log(res.data);
            for(let key in res.data){
                FetchOrder.push({
                    ...res.data[key],
                    id:key
                });
            }
            dispatch(fetchOrderSuccess(FetchOrder));
        })
        .catch(err=>{
            dispatch(fetchOrderFail(err));
        });
    }
}