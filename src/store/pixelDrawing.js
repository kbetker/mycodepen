const SELECTED_COLOR = 'pixelDrawing/SELECTED_COLOR';
const KEY_PRESSED = 'pixelDrawing/KEY_PRESSED';
const MOUSE_DOWN = 'pixelDrawing/MOUSE_DOWN';
const EDIT_MODE = 'pixelDrawing/EDIT_MODE';


export const loadSelectedColor = (selectedColor) => {
    return {
        type: SELECTED_COLOR,
        selectedColor
    };
};

export const loadKeyPressed = (keyPressed) => {
    return {
        type: KEY_PRESSED,
        keyPressed
    };
};

export const loadMouseDown = (mouseDown) => {
    return {
        type: MOUSE_DOWN,
        mouseDown
    };
};

export const loadEditMode = (editMode) => {
    return {
        type: EDIT_MODE,
        editMode
    };
};


export const dispatchSelectedColor = (selectedColor) => async (dispatch) => {
    dispatch(loadSelectedColor(selectedColor));
};
export const dispatchKeyPressed = (keyPressed) => async (dispatch) => {
    dispatch(loadKeyPressed(keyPressed));
};

export const dispatchMouseDown = (mouseDown) => async (dispatch) => {
    dispatch(loadMouseDown(mouseDown));
};

export const dispatchEditMode = (editMode) => async (dispatch) => {
    dispatch(loadEditMode(editMode));
};


export const initialState = {
    selectedColor: "rgba(0, 0, 0, 1)",
    keyPressed: {"key": '', "ctrlKey": false},
    mouseDown: false,
    editMode: 'drawingMode',
    drawing: [],
}

const pixelDrawingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SELECTED_COLOR:
            newState = Object.assign({}, state);
            newState.selectedColor = action.selectedColor
            return newState;
        case KEY_PRESSED:
            newState = Object.assign({}, state);
            newState.keyPressed = action.keyPressed
            return newState;
        case MOUSE_DOWN:
            newState = Object.assign({}, state);
            newState.mouseDown = action.mouseDown
            return newState;
        case EDIT_MODE:
            newState = Object.assign({}, state);
            newState.editMode = action.editMode
            return newState;
        default:
            return state;

    };
};

export default pixelDrawingReducer
