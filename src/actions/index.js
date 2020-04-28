const axios = require('axios');

export const ADD_COMPUTE_RESOURCE = 'ADD_COMPUTE_RESOURCE'
export const DELETE_COMPUTE_RESOURCE = 'DELETE_COMPUTE_RESOURCE'
export const RECEIVE_COMPUTE_RESOURCE_JOB_STATS = 'RECEIVE_COMPUTE_RESOURCE_JOB_STATS'
export const INIT_FETCH_COMPUTE_RESOURCE_JOB_STATS = 'INIT_FETCH_COMPUTE_RESOURCE_JOB_STATS'
export const RECEIVE_COMPUTE_RESOURCE_ACTIVE = 'RECEIVE_COMPUTE_RESOURCE_ACTIVE'
export const INIT_FETCH_COMPUTE_RESOURCE_ACTIVE = 'INIT_FETCH_COMPUTE_RESOURCE_ACTIVE'

export const INIT_FETCH_COMPUTE_RESOURCE_JOBS = 'INIT_FETCH_COMPUTE_RESOURCE_JOBS'
export const RECEIVE_COMPUTE_RESOURCE_JOBS = 'RECEIVE_COMPUTE_RESOURCE_JOBS'

const sleep = m => new Promise(r => setTimeout(r, m))

export const addComputeResource = newComputeResource => ({
  type: ADD_COMPUTE_RESOURCE,
  newComputeResource
})

export const addComputeResourceAsyncExample = newComputeResource => {
  return async (dispatch) => {
    await sleep(5000);
    dispatch({
      type: ADD_COMPUTE_RESOURCE,
      newComputeResource
    });
  }
}

export const deleteComputeResource = computeResourceName => ({
  type: DELETE_COMPUTE_RESOURCE,
  computeResourceName
})

export const fetchComputeResourceJobStats = computeResourceName => {
  return async (dispatch, getState) => {
    const state = getState();
    let cr = findComputeResource(state, computeResourceName);
    if (!cr) return;
    if (cr.fetchingJobStats) return;
    dispatch({
      type: INIT_FETCH_COMPUTE_RESOURCE_JOB_STATS,
      computeResourceName: computeResourceName
    });
    await sleep(50);

    const url = `/getComputeResourceJobStats?computeResourceId=${cr.computeResourceId}&mongoUri=${encodeURIComponent(cr.mongoUri)}&databaseName=${cr.databaseName}`;
    console.log(url);
    try {
      const result = await axios.get(url);
      const jobStats = result.data;

      dispatch({
        type: RECEIVE_COMPUTE_RESOURCE_JOB_STATS,
        computeResourceName: computeResourceName,
        jobStats: jobStats
      });
    }
    catch(err) {
      console.error(err);
      dispatch({
        type: RECEIVE_COMPUTE_RESOURCE_JOB_STATS,
        computeResourceName: computeResourceName,
        jobStats: {error: true}
      });
    }
  }
}

export const fetchComputeResourceActive = computeResourceName => {
  return async (dispatch, getState) => {
    const state = getState();
    let cr = findComputeResource(state, computeResourceName);
    if (!cr) return;
    if (cr.fetchingActive) return;
    dispatch({
      type: INIT_FETCH_COMPUTE_RESOURCE_ACTIVE,
      computeResourceName: computeResourceName
    });
    await sleep(50);
    dispatch({
      type: RECEIVE_COMPUTE_RESOURCE_ACTIVE,
      computeResourceName: computeResourceName,
      active: true
    });
  }
}

const findComputeResource = (state, computeResourceName) => {
  return state.computeResources.filter(r => (r.computeResourceName === computeResourceName))[0]
}

export const fetchComputeResourceJobs = (computeResourceName) => {
  return async (dispatch, getState) => {
    const state = getState();
    let cr = findComputeResource(state, computeResourceName);
    if (!cr) return;
    const stateComputeResourceJobs = cr[computeResourceName] || {};
    if (stateComputeResourceJobs.fetchingJobs) return;
    dispatch({
      type: INIT_FETCH_COMPUTE_RESOURCE_JOBS,
      computeResourceName: computeResourceName
    });
    await sleep(50);

    const url = `/getComputeResourceJobs?computeResourceId=${cr.computeResourceId}&mongoUri=${encodeURIComponent(cr.mongoUri)}&databaseName=${cr.databaseName}`;
    try {
      const result = await axios.get(url);
      const jobs = result.data.jobs;

      dispatch({
        type: RECEIVE_COMPUTE_RESOURCE_JOBS,
        computeResourceName: computeResourceName,
        jobs: jobs,
        error: false
      });
    }
    catch(err) {
      dispatch({
        type: RECEIVE_COMPUTE_RESOURCE_JOBS,
        computeResourceName: computeResourceName,
        jobs: [],
        error: true
      });
    }
  }
}