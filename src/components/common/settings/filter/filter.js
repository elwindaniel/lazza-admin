import "./filter.css";
import Typography from "@material-ui/core/Typography";

import TopBar from "../../topBar";
import YellowBox from "../../yellowbox";
import FilterTable from "../../table/useTable";
import FilterForm from "../../forms/createFilter";

function Filter() {
  return (
    <div className="filter">
      <TopBar />
      <div className="filter-body">
        <YellowBox />
        {/*header */}
        <div className="filter_header">
          <div>
            <Typography variant="h5">Filters</Typography>
          </div>
        </div>
        <div className="row">
          <div className="flex-2">
            <FilterTable />
          </div>
          <div className="flex-1">
            <div>
              <FilterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
