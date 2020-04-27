import React from 'react';
import { connect } from 'react-redux'
import { TableHead, TableBody, TableRow, TableCell, Table } from '@material-ui/core'

const ComputeResourceView = ({ computeResourceName, computeResources }) => {
    const cr = computeResources.filter(cr => cr.computeResourceName === computeResourceName)[0] || {};

    return (
        <div className="ComputeResourceView">
            <h3>Compute resource: {cr.computeResourceName}</h3>
            <Table>
                <TableHead />
                <TableBody>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{cr.computeResourceName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>{cr.computeResourceId}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        
    )
}

const mapStateToProps = state => ({
    computeResources: state.computeResources
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComputeResourceView)
