import React, { useState, useEffect } from "react";
import axios from "../../../../api/axios";
import { customersRequests } from "../../../../api/constants";

export default function CustomerView({ itemId }) {
  const GET_URLId = `${customersRequests.getUserById}/${itemId}`;
  const [values, setValues] = useState();

  useEffect(() => {
    axios
      .get(GET_URLId)
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => {});
  }, []);

  return <div></div>;
}
