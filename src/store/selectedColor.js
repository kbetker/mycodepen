const CURRENT_COLOR = 'color/CURRENT_COLOR';


export const loadSelectedColor = ( color ) => {
    return {
        type: CURRENT_COLOR,
        color
    };
};

export const dispatchSelectedColor = (color) => async (dispatch) => {
        dispatch(loadcolor(color));

  };




  export const initialState = {selectedColor: ""}

  const colorReducer = (state = initialState, action) => {
    let newState;
    switch( action.type ){
        case MAP_CONTROL:
            newState = Object.assign({}, state);
            newState = action.color
            return newState;

        default:
            return state;

    };
};

export default color
