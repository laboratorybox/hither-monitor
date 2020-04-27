import time
import json
from flask import Flask, request
import os
import hither2 as hi

app = Flask(__name__)

@app.route('/getComputeResourceJobStats')
def getComputeResourceJobStats():
    computeResourceId = request.args.get('computeResourceId')
    database = hi.Database(
        mongo_url=os.environ['LABBOX_EPHYS_MONGO_URI'],
        database='labbox'
    )
    db = database.collection('hither2_jobs')
    query = dict(
        compute_resource_id=computeResourceId
    )
    docs = [doc for doc in db.find(query)]

    print(computeResourceId, len(docs))
    return dict(
        numTotal=len(docs),
        numQueued=len([doc for doc in docs if doc['status'] == 'queued']),
        numRunning=len([doc for doc in docs if doc['status'] == 'running']),
        numFinished=len([doc for doc in docs if doc['status'] == 'finished']),
        numError=len([doc for doc in docs if doc['status'] == 'error'])
    )

@app.route('/getComputeResourceJobs')
def getComputeResourceJobs():
    computeResourceId = request.args.get('computeResourceId')
    print('jobs', computeResourceId)
    database = hi.Database(
        mongo_url=os.environ['LABBOX_EPHYS_MONGO_URI'],
        database='labbox'
    )
    db = database.collection('hither2_jobs')
    query = dict(
        compute_resource_id=computeResourceId
    )
    projection = {
        '_id': False,
        'job_id': True,
        'handler_id': True,
        'job_serialized.function_name': True,
        'job_serialized.function_version': True,
        'job_serialized.label': True,
        'status': True
    }
    jobs = [
        doc for doc in db.find(query, projection)
    ]

    print(computeResourceId, len(jobs))
    return dict(
        jobs=jobs
    )