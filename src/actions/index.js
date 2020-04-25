export const ADD_COMPUTE_RESOURCE = 'ADD_COMPUTE_RESOURCE'
export const DELETE_COMPUTE_RESOURCE = 'DELETE_COMPUTE_RESOURCE'

export const addComputeResource = newComputeResource => ({
  type: ADD_COMPUTE_RESOURCE,
  newComputeResource
})

export const deleteComputeResource = computeResourceName => ({
    type: DELETE_COMPUTE_RESOURCE,
    computeResourceName
})