import * as Actions from './Actions';

const startState = {
    ingredients: null,
    totalPrice: 4
}

export default (state = startState, action) => {
    const PRICES = {
        salad: 0.5,
        bacon: 0.7,
        cheese: 0.4,
        meat: 1.3
    };

    switch (action.type) {
        case Actions.GETING:
            return {
                ...state,
                ingredients: action.ingredients
            }
        case Actions.ADDING:
            const addState = JSON.parse(JSON.stringify(state));
            addState.ingredients[action.ingredient] += 1;
            addState.totalPrice += PRICES[action.ingredient];
            return addState;
        case Actions.REMING:
            const remState = JSON.parse(JSON.stringify(state));
            remState.ingredients[action.ingredient] -= 1;
            remState.totalPrice -= PRICES[action.ingredient];
            return remState;
        default:
            return state;
    }
}