import React from 'react'
import { connect } from 'react-redux'
import { addComputeResource } from '../actions'

import { useForm } from "react-hook-form";


// Messages
const required = "This field is required";
const maxLength = "Your input exceed maximum length";

const errorMessage = error => {
    return <div className="invalid-feedback">{error}</div>;
};

const Form = ({onSubmit, onCancel}) => {
    const { register, handleSubmit, errors } = useForm();

    return (
      <div className="container">
        <div className="col-sm-12">
          <h3>Add compute resource</h3>
        </div>
        <div className="col-sm-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Compute resource name"
                name="computeResourceName"
                ref={register({ required: true, maxLength: 30 })}
              />
              {errors.computeResourceName &&
                errors.computeResourceName.type === "required" &&
                errorMessage(required)}
              {errors.computeResourceName &&
                errors.computeResourceName.type === "maxLength" &&
                errorMessage(maxLength)}
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Compute resource ID"
                name="computeResourceId"
                ref={register({ required: true, maxLength: 30 })}
              />
              {errors.computeResourceId &&
                errors.computeResourceId.type === "required" &&
                errorMessage(required)}
              {errors.computeResourceId &&
                errors.computeResourceId.type === "maxLength" &&
                errorMessage(maxLength)}
            </div>
            <div className="form-group">
              <input className="btn btn-primary" type="submit" />
              <input className="btn btn-secondary" type="button" value="Cancel"
                onClick={() => onCancel && onCancel()}
              />
            </div>
          </form>
        </div>
      </div>
    );
};

const AddComputeResource = ({ addComputeResource, onDone }) => {
    // return <div>Add compute resource...</div>
    const handleSubmit = (data) => {
        addComputeResource(data);
        onDone && onDone()
    }
    const handleCancel = () => {
        onDone && onDone()
    }
    return <Form onSubmit={handleSubmit} onCancel={handleCancel} />;
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  addComputeResource: newComputeResource => dispatch(addComputeResource(newComputeResource))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComputeResource)
