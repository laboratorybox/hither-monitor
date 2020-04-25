import { combineReducers } from 'redux'
import { ADD_COMPUTE_RESOURCE } from '../actions'
import { DELETE_COMPUTE_RESOURCE } from '../actions'

const computeResources = (state = [], action) => {
    switch (action.type) {
        case ADD_COMPUTE_RESOURCE:
            return [
                ...state,
                action.newComputeResource
            ]
        case DELETE_COMPUTE_RESOURCE:
            return state.filter(r => r.computeResourceName !== action.computeResourceName);
        default:
            return state
    }
}

export default combineReducers({
    computeResources
})