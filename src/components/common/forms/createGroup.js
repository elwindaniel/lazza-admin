import React from 'react';
import { Button, TextField } from "@material-ui/core";
import "./form.css";

function CreateGroup(){
return(
<div className="formBody">
    <div className="Row">
    
    <div className="insider">
    <div className="titleText">Create Group</div>
    <TextField
            className="textArea_flex8"
            multiline
            placeholder="Group Name"
            fullWidth
            margin="normal"
            variant="outlined"
           
           
          />
    
    <TextField
            className="textArea_flex8"
            multiline
            placeholder="Filter"
            fullWidth
            margin="normal"
            variant="outlined"
           
           
          />
          </div>
            <div className="createbtn">
          <button className="button">Create Group</button>
        </div>
    </div>
    </div>

)
}
export default CreateGroup;
