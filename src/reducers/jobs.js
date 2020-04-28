import { INIT_FETCH_COMPUTE_RESOURCE_JOBS } from '../actions'
import { RECEIVE_COMPUTE_RESOURCE_JOBS } from '../actions'

const jobs = (state = {}, action) => {
    const computeResourceState = state[action.computeResourceName] || {};
    let computeResourceState2 = computeResourceJobs(computeResourceState, action);
    let state2 = {...state};
    state2[action.computeResourceName] = computeResourceState2;
    return state2;
}

const computeResourceJobs = (state, action) => {
    switch (action.type) {
        case INIT_FETCH_COMPUTE_RESOURCE_JOBS:
            return {...state, fetchingJobs: true, jobs: [], error: false}
        case RECEIVE_COMPUTE_RESOURCE_JOBS:
            return {...state, fetchingJobs: false, jobs: action.jobs, error: action.error}
        default:
            return state
    }
}

export default jobs