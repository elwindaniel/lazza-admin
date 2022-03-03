import React  from 'react';
import "./form.css";
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

function BChart(){
   
return(
    <Paper>
    <Chart 
      data={data}
      
    >
        
      <ArgumentAxis />
      <ValueAxis max={200} />
      
      <BarSeries
        valueField="population"
        argumentField="year"
      />
      
      <Animation />
    </Chart>
  </Paper>
)


}
export default BChart;
const data = [
    { year: '01', population: 150 },
    { year: '02 ',population:200 },
    { year: '03', population: 120},
    { year: '04', population: 145 },
    { year: '05', population: 170 },
    { year: '06', population:200 },
    { year: '07', population: 145 },
    { year: '08', population: 100 },
    { year: '09', population: 160 },    
  ];
  
 