import { combineReducers } from 'redux'
import computeResources from './computeResources'
import jobs from './jobs'

export default combineReducers({
    computeResources,
    jobs
})