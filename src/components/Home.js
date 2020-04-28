import React from 'react';
import './Home.css';
import ComputeResourcesTable from '../containers/ComputeResourcesTable';
import { Typography } from '@material-ui/core';

function Home() {
  return (
    <div>
      <Typography component="p">
        View and manage hither compute resources and jobs.
      </Typography>
      <h1>Compute resources</h1>
      <div style={{ maxWidth: 800 }}>
        <ComputeResourcesTable />
      </div>
    </div>

  );
}

export default Home;
