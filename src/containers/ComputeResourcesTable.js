import React, { useState } from 'react'
import { connect } from 'react-redux'
import { IconButton } from '@material-ui/core'
import EditableTable from '../components/EditableTable'
import { deleteComputeResource } from '../actions';
import AddComputeResource from './AddComputeResource';
import { Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const ComputeResourcesTable = ({ computeResources, onDeleteComputeResource }) => {

    const [mode, setMode] = useState('view');

    const rows = computeResources.map(cr => ({
        key: cr.computeResourceName,
        computeResourceName: {
            element: <Link to={`/computeResource/${cr.computeResourceName}`}>{cr.computeResourceName}</Link>
        },
        computeResourceId: {
            text: cr.computeResourceId
        }
    }));
    const columns = [
        {
            key: 'computeResourceName',
            label: 'Compute resource name'
        },
        {
            key: 'computeResourceId',
            label: 'Compute resource ID'
        }
    ]

    if (mode === 'view') {
        return (
            <div>
                <IconButton onClick={() => setMode('add')}><Add /> Add new compute resource</IconButton>
                <EditableTable
                    rows={rows}
                    columns={columns}
                    onDeleteRow={(row) => onDeleteComputeResource(row.key)}
                />
            </div>
        );
    }
    else if (mode === 'add') {
        return (
            <AddComputeResource
                onDone={() => setMode('view')}
            />
        )
    }
    else {
        return <div>Invalid mode.</div>
    }
}

const mapStateToProps = state => ({
    computeResources: state.computeResources
})

const mapDispatchToProps = dispatch => ({
    onDeleteComputeResource: computeResourceName => dispatch(deleteComputeResource(computeResourceName))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComputeResourcesTable)
