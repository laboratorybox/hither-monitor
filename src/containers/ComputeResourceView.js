import React from 'react';
import { connect } from 'react-redux'
import { Fab, CircularProgress } from '@material-ui/core'
import { fetchComputeResourceJobs } from '../actions';
import { Refresh } from '@material-ui/icons';
import NiceTable from '../components/NiceTable';

const JobsView = ({ jobs }) => {
    function sortByKeys(array, keys) {
        return [...array].sort(function (a, b) {
            for (let key of keys) {
                var x = a[key]; var y = b[key];
                if (typeof(x) == 'object') x = x.text;
                if (typeof(y) == 'object') y = y.text;
                if (x < y) return -1;
                if (x > y) return 1;
            }
            return 0;
        });
    }

    const rows = jobs.map(job => (
        {
            key: job.job_id,
            label: {text: job.job_serialized.label},
            function: {text: `${job.job_serialized.function_name} (${job.job_serialized.function_version})`},
            status: {text: job.status},
            handler: {text: job.handler_id}
        }
    ));

    const columns = [
        {
            label: "Job",
            key: "label"
        },
        {
            label: "Function",
            key: "function"
        },
        {
            label: "Status",
            key: "status"
        },
        {
            label: "Handler",
            key: "handler"
        }
    ];

    const rowsSorted = sortByKeys(rows, ['status', 'function', 'label'])
    return (
        <NiceTable
            rows={rowsSorted}
            columns={columns}
        />
    );
}

const ComputeResourceView = ({ computeResourceName, jobs, onFetchComputeResourceJobs }) => {
    const state0 = jobs[computeResourceName] || {};

    const refresh = () => {
        onFetchComputeResourceJobs(computeResourceName)
    }

    let content;
    if (state0.fetchingJobs) {
        content = <div style={{padding: 50}}><CircularProgress /></div>
    }
    else if (state0.error) {
        content = <div style={{padding: 10}}>Error fetching jobs.</div>
    }
    else if (state0.jobs) {
        console.log(state0.jobs);
        content = (
            <div style={{padding: 10}}>
                <JobsView jobs={state0.jobs} />
            </div>
        );
    }
    else {
        content = <span>Waiting</span>;
        setTimeout(function() {
            onFetchComputeResourceJobs(computeResourceName)
        }, 0);
    }

    return (
        <div className="ComputeResourceView">
            <h1>Compute resource: {computeResourceName}</h1>
            <div title="Refresh jobs" style={{padding: 30}}><Fab color="secondary" onClick={() => refresh()}><Refresh /></Fab></div>
            {content}
        </div>
    );
}

const mapStateToProps = state => ({
    jobs: state.jobs
})

const mapDispatchToProps = dispatch => ({
    onFetchComputeResourceJobs: (computeResourceName) => dispatch(fetchComputeResourceJobs(computeResourceName))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComputeResourceView)
