import axios from "./axios";
import { filterGroupRequests } from "./constants";

const GET_FILTERGROUP_URL = `${filterGroupRequests.getAllFilterGroup}`;

export function getFilterGroupDetails() {
  axios
    .get(GET_FILTERGROUP_URL)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
