import { csrfFetch } from "./csrf"
const SELECTED_COLOR = 'pixelDrawing/SELECTED_COLOR';
const KEY_PRESSED = 'pixelDrawing/KEY_PRESSED';
const MOUSE_DOWN = 'pixelDrawing/MOUSE_DOWN';
const EDIT_MODE = 'pixelDrawing/EDIT_MODE';
const ALL_DRAWINGS = 'pixelDrawing/ALL_DRAWINGS';
const HIDE_TOOLS = 'pixelDrawing/HIDE_TOOLS';
const SAVED_DRAWING = 'pixelDrawing/SAVED_DRAWING';
const ALL_MY_DRAWINGS = 'pixelDrawing/ALL_MY_DRAWINGS';
const EDIT_DRAWING = 'pixelDrawing/EDIT_DRAWING';
const DELETE_DRAWING = 'pixelDrawing/DELETE_DRAWING';






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

export const loadAllMYDrawings = (allMYDrawings) => {
    return {
        type: ALL_MY_DRAWINGS,
        allMYDrawings
    };
};

export const loadHideTools = (hideTools) => {
    return {
        type: HIDE_TOOLS,
        hideTools
    };
};

export const loadSavedDrawing = (drawing) => {
    return {
        type: SAVED_DRAWING,
        drawing
    };
};

export const loadEditDrawing = (drawing) => {
    return {
        type: EDIT_DRAWING,
        drawing
    };
};

export const loadDeleteDrawing = (drawing) => {
    return {
        type: DELETE_DRAWING,
        drawing
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

export const dispatchSavedDrawing = (drawing) => async (dispatch) => {
    dispatch(loadHideTools(drawing));
};



export const fetchEditMyDrawing = (id) => async (dispatch) => {
    const response = await fetch(`/api/drawings/edit/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadEditDrawing(data.drawing));
        return data
    } else {
        // const data = await response.json
        return response
    }
};



export const fetchAllMYDrawings = (owner_id) => async (dispatch) => {
    const response = await fetch(`/api/drawings/all/${owner_id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllMYDrawings(data.allMYDrawings));
        return data
    } else {
        // const data = await response.json
        return response
    }
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


export const dispatchPostDrawing = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/drawings/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)

    });
    if(response.ok){
        const data = await response.json();
        dispatch(loadSavedDrawing(data.drawing));
        return data.drawing
    } else{
        return response
    }
};


export const dispatchUpdateDrawing = (payload, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/drawings/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)

    });
    if(response.ok){
        const data = await response.json();
        dispatch(loadSavedDrawing(data.drawing));
        return data.drawing
    } else{
        return response
    }
};



export const dispatchDeleteDrawing = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/drawings/delete/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    });
    if(response.ok){
        const data = await response.json();
        dispatch(loadDeleteDrawing(data.id));
        return data.id
    } else{
        return response
    }
};



export const initialState = {
    selectedColor: "rgba(0, 0, 0, 1)",
    keyPressed: { "key": '', "ctrlKey": false },
    mouseDown: false,
    editMode: 'ignoreKeyPress',
    drawing: [],
    allDrawings: [],
    allMYDrawings: [],
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
            let key = Object.keys(action.hideTools)[0]
            let value = action.hideTools[key]
            newState.hideTools[key] = value
            return newState;
        case SAVED_DRAWING:
            newState = Object.assign({}, state);
            newState.drawing = action.drawing
            return newState;
        case ALL_MY_DRAWINGS:
            newState = Object.assign({}, state);
            newState.allMYDrawings = action.allMYDrawings
            return newState;
        case EDIT_DRAWING:
            newState = Object.assign({}, state);
            newState.drawing = action.drawing
            return newState;
        case DELETE_DRAWING:
            newState = Object.assign({}, state);
            let filtered = newState.allMYDrawings.filter(el => el.id !== Number(action.drawing) )
            // console.log(filtered, action, "?!?!?!?!?!??!?!?!?!?!??!?!?!?")
            newState.allMYDrawings = filtered
            // newState.drawing = action.drawing
            return newState;
        default:
            return state;

    };
};

export default pixelDrawingReducer
