import * as actionType from './actionType';
import axios from '../../axios-orders';

export const addIngredient=(name)=>{
    return{
        type:actionType.ADD_INGREDIENTS,
        ingredientName:name
    };
}


export const deleteIngredient=(name)=>{
    return{
        type:actionType.DELETE_INGREDIENTS,
        ingredientName:name
    };
}

export const setIngredient=(ingredients)=>{
    return{
        type:actionType.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngredientError=()=>{
    return{
        type:actionType.FETCH_INGREDIENTS_ERROR
    }
}

export const initIngredient=()=>{
    return dispatch=>{
        axios.get('https://burger-app2.firebaseio.com/ingredients.json').then(response=>{
            dispatch(setIngredient(response.data));
            })
            .catch(error=>{
                dispatch(fetchIngredientError());
            });
    }
}

export const initAction=()=>{
    return{
        type:actionType.PURCHASE_BURGER_INIT
    }
}

