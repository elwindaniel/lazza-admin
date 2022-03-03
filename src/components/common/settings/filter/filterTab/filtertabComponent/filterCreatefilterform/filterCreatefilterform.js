import React from 'react';
import './filterCreatefilterform.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Filtercreatefilterform() {
    return (
        <div className="filterform">
            <div className="createfilter">
            Create Filter
            </div>
            <div className="form">
            <TextField id="group-name" label="Group Name" type="text" variant="outlined" />
            </div>
            <div className="form">
            <TextField id="filter" label="Filter" type="text" variant="outlined" />
            </div>
            <div className="form">
            <Button variant="contained" color="primary"> Create </Button>
            </div>
            
        </div>
    )
}

export default Filtercreatefilterform;
