import * as actionTypes from '../actions/actionTypes';

const startState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

export default (state = startState, action) => {
    const PRICES = {
        salad: 0.5,
        bacon: 0.7,
        cheese: 0.4,
        meat: 1.3
    };

    switch (action.type) {
        case actionTypes.GET_ING:
            return {
                ...state,
                ingredients: action.ingredients
            };
        case actionTypes.CATCH_ERR:
            return {
                ...state,
                error: action.err
            };
        case actionTypes.ADD_ING:
            const addState = JSON.parse(JSON.stringify(state));
            addState.ingredients[action.ingredient] += 1;
            addState.totalPrice += PRICES[action.ingredient];
            return addState;
        case actionTypes.REM_ING:
            const remState = JSON.parse(JSON.stringify(state));
            remState.ingredients[action.ingredient] -= 1;
            remState.totalPrice -= PRICES[action.ingredient];
            return remState;
        default:
            return state;
    }
}