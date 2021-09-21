const SELECTED_COLOR = 'color/SELECTED_COLOR';


export const loadSelectedColor = ( selectedColor ) => {
    return {
        type: SELECTED_COLOR,
        selectedColor
    };
};

export const dispatchSelectedColor = (selectedColor) => async (dispatch) => {
        dispatch(loadSelectedColor(selectedColor));

  };




  export const initialState = {
      selectedColor: "rgba(0, 0, 0, 1)",
      drawing: [],
    }

  const pixelDrawingReducer = (state = initialState, action) => {
    let newState;
    switch( action.type ){
        case SELECTED_COLOR:
            newState = Object.assign({}, state);
            newState.selectedColor = action.selectedColor
            return newState;

        default:
            return state;

    };
};

export default pixelDrawingReducer
