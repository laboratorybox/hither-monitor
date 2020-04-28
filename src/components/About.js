import React from 'react';
import './About.css';
import { Typography } from '@material-ui/core';

function Home() {
    return (
        <div>
            <Typography component="p">
                Hither monitor allows you to view and manage compute resources and jobs associated
                with the
                {" "}<a href="https://github.com/laboratorybox/hither2" target="_blank">hither</a>{" "}
                Python project.
            </Typography>
            <p />
            <Typography component="p">
                Project home:
                {" "}<a href="https://github.com/laboratorybox/hither-monitor" target="_blank">hither-monitor</a>
            </Typography>
            <p />
            <Typography component="p">
                Authors: Jeremy Magland, Flatiron Institute
            </Typography>
        </div>
    );
}

export default Home;
