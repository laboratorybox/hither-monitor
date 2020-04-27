const axios = require('axios');

export const ADD_COMPUTE_RESOURCE = 'ADD_COMPUTE_RESOURCE'
export const DELETE_COMPUTE_RESOURCE = 'DELETE_COMPUTE_RESOURCE'
export const RECEIVE_COMPUTE_RESOURCE_JOB_STATS = 'RECEIVE_COMPUTE_RESOURCE_JOB_STATS'
export const INIT_FETCH_COMPUTE_RESOURCE_JOB_STATS = 'INIT_FETCH_COMPUTE_RESOURCE_JOB_STATS'
export const RECEIVE_COMPUTE_RESOURCE_ACTIVE = 'RECEIVE_COMPUTE_RESOURCE_ACTIVE'
export const INIT_FETCH_COMPUTE_RESOURCE_ACTIVE = 'INIT_FETCH_COMPUTE_RESOURCE_ACTIVE'

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
    await sleep(500);

    const result = await axios.get(`/getComputeResourceJobStats?computeResourceId=${cr.computeResourceId}`);
    const jobStats = result.data;

    dispatch({
      type: RECEIVE_COMPUTE_RESOURCE_JOB_STATS,
      computeResourceName: computeResourceName,
      jobStats: jobStats
    });

    // if (!cr.mongoUri) {
    //   // todo
    //   return;
    // }

    // var MongoClient = require('mongodb').MongoClient;

    // console.log('---', cr.mongoUri);
    // let client;
    // try {
    //   client = await MongoClient.connect(cr.mongoUri, { useNewUrlParser: true });
    //   const db = client.db(cr.databaseName);
    //   const query = {
    //     compute_resource_id: cr.computeResourceId
    //   };
    //   const result = await db.collection("hither2_jobs").find(query).toArray();
    //   console.log(result);
    //   dispatch({
    //     type: RECEIVE_COMPUTE_RESOURCE_JOB_STATS,
    //     computeResourceName: computeResourceName,
    //     jobStats: {
    //       numQueued: 1,
    //       numRunning: 2,
    //       numFinished: 3,
    //       numError: 4
    //     }
    //   });
    // }
    // catch(err) {
    //   console.error(err);
    // }
    // if (client) {
    //   client.close();
    // }
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
    await sleep(500);
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
