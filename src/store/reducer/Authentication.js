import * as actionType from '../action/actionType';

const intialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
}

const reducer=(state=intialState,action)=>{
    switch (action.type) {
        case actionType.AUTH_START:
            return{
                ...state,
                error:null,
                loading:true
            }
        case actionType.AUTH_SUCCESS:
            return{
                ...state,
                token:action.idToken,
                userId:action.userId,
                loading:false,
                error:null
                }
        case actionType.AUTH_FAIL:
            return{
                ...state,
                error:action.error,
                loading:false
                   }
        case actionType.AUTH_LOGOUT:
            return{
                ...state,
                token:null,
                userId:null
            }
            case actionType.SET_AUTH_REDIRECT_PATH:
                return{
                    ...state,
                    authRedirectPath:action.path
                }

        default:
            return state
    }

}
export default reducer;