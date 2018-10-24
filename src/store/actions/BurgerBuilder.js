import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const getIng = data => ({ type: actionTypes.GET_ING, ingredients: data });
export const catchErr = err => ({ type: actionTypes.CATCH_ERR, err: err });
export const addIng = ing => ({ type: actionTypes.ADD_ING, ingredient: ing });
export const remIng = ing => ({ type: actionTypes.REM_ING, ingredient: ing });
export const fetchIng = url => (dispatch, getState) => {
	axios.get(url)
        .then(res => {
            dispatch(getIng(res.data));
        })
        .catch(err => {
        	dispatch(catchErr(err));
            // this.setState({

            //     // if error, set this.state.error = true
            //     error : true
            // })
        });
}