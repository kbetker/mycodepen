const SELECTED_COLOR = 'pixelDrawing/SELECTED_COLOR';
const KEY_PRESSED = 'pixelDrawing/KEY_PRESSED';
const MOUSE_DOWN = 'pixelDrawing/MOUSE_DOWN';
const EDIT_MODE = 'pixelDrawing/EDIT_MODE';
const ALL_DRAWINGS = 'pixelDrawing/ALL_DRAWINGS';
const HIDE_TOOLS = 'pixelDrawing/HIDE_TOOLS';




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
export const loadAllDrawings = (allDrawings) => {
    return {
        type: ALL_DRAWINGS,
        allDrawings
    };
};
export const loadHideTools = (hideTools) => {
    return {
        type: HIDE_TOOLS,
        hideTools
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
export const dispatchHideTools = (hideTools) => async (dispatch) => {
    dispatch(loadHideTools(hideTools));
};
export const fetchAllDrawings = () => async (dispatch) => {
    const response = await fetch("/api/drawings/all");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllDrawings(data.allDrawings));
        return data
    } else {
        // const data = await response.json
        return response
    }
};



export const initialState = {
    selectedColor: "rgba(0, 0, 0, 1)",
    keyPressed: { "key": '', "ctrlKey": false },
    mouseDown: false,
    editMode: 'drawingMode',
    drawing: [],
    allDrawings: [],
    hideTools: {"colors": false, "tools": false}
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
        case ALL_DRAWINGS:
            newState = Object.assign({}, state);
            newState.allDrawings = action.allDrawings
            return newState;
        case HIDE_TOOLS:
            newState = Object.assign({}, state);
            // console.log(action, "WTFWTFWTW")
            let key = Object.keys(action.hideTools)[0]
            let value = action.hideTools[key]
            // console.log(key, ":", value, "WTFWTFWTW")
            newState.hideTools[key] = value
            // return newState;
        default:
            return state;

    };
};

export default pixelDrawingReducer
