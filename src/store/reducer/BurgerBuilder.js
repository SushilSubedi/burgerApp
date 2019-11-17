import * as actionType from '../action/actionType';

const initialState={
    ingredients:null,
    error:false,
    TotalPrice:40,
    building:false
}

const INGREDIENTS_PRICE={
    bacon:10,
    salad:10,
    cheese:10,
    meat:15
  }


const reducer=(state=initialState,action)=>{
switch(action.type){
case actionType.ADD_INGREDIENTS:
    return{
        ...state,
        ingredients:{
            ...state.ingredients,
            [action.ingredientName]:state.ingredients[action.ingredientName]+1
        },
        TotalPrice:state.TotalPrice+INGREDIENTS_PRICE[action.ingredientName],
        building:true

    }
    case actionType.DELETE_INGREDIENTS:
        return{
            ...state,
        ingredients:{
            ...state.ingredients,
            [action.ingredientName]:state.ingredients[action.ingredientName]-1
        },
        TotalPrice:state.TotalPrice-INGREDIENTS_PRICE[action.ingredientName],
        building:true

        }
        case actionType.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:action.ingredients,
                error:false,
                TotalPrice:40,
                building:false
            }
            case actionType.FETCH_INGREDIENTS_ERROR:
                return{
                    ...state,
                    error:true
                }
    default:
        return state;
}

}
export default reducer;