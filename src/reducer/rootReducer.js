const initialState = {
    data: [],
    account: '',
    contract: [],
    supply: 0,
    test: 'hiya'
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case 'TEST':
            return {
                ...state
            }
        case 'GET_WEB3_DATA':
            return {
                ...state,
                account: action.payload.myAccount,
                supply: action.payload.supply,
            }
        case 'CONNECT_WEB3':
            return {
                ...state,
                account: action.payload.myAccount,
                contract: action.payload.contract,
                supply: action.payload.supply,
            }
        default:
            return state;
    }
}

export default rootReducer;