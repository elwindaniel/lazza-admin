import { useEffect, useState } from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "../../../../api/axios";
import { user } from "../../../../api/constants";
import EditDeliveryLocation from "../editAddress";
import DelivLocationCard from "./card";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

function DeliveryLocation(props) {
  const [edit, setEdit] = useState(false);

  const changeDefaultAddURL = `${user.editUserDataWithid}/`;

  let userId = props.userId;

  const defaultIndex =
    props.user === "signedUser" ? parseInt(props.address.defaultAddress) : 0;

  const userData = {
    defaultAddress: "",
  };

  const defaultAddresssChangeFn = (id, index) => {
    userData.defaultAddress = index.toString();
    Axios.put(changeDefaultAddURL + userId, userData).then((res) => {});
  };

  const [eId, seteId] = useState();
  const [eAddressLine1, seteAddressLine1] = useState();
  const [eAddressLine2, seteAddressLine2] = useState();
  const [eStreet, seteStreet] = useState();
  const [eCity, seteCity] = useState();
  const [eDistrict, seteDistrict] = useState();
  const [eState, seteState] = useState();
  const [eCountry, seteCountry] = useState();
  const [eZipcode, seteZipcode] = useState();

  const editData = (
    id,
    addressLine1,
    addressLine2,
    street,
    city,
    district,
    state,
    country,
    zipcode
  ) => {
    setEdit(true);
    seteId(id);
    seteAddressLine1(addressLine1);
    seteAddressLine2(addressLine2);
    seteStreet(street);
    seteCity(city);
    seteDistrict(district);
    seteState(state);
    seteCountry(country);
    seteZipcode(zipcode);
  };

  const defaultAdd = (id, index) => {
    let editAddurl = changeDefaultAddURL + userId;

    Axios.put(editAddurl, { defaultAddress: index })
      .then((res) => {
        props.onSuccessEdit();
      })
      .catch((err) => {});
  };

  function editSuccess() {
    setEdit(false);
    props.onSuccessEdit();
  }

  function defaltAddresChild() {
    props.onSuccessEdit();
  }

  function child(data) {
    editData(
      data._id,
      data.addressLine1,
      data.addressLine2,
      data.street,
      data.city,
      data.district,
      data.state,
      data.country,
      data.zipcode
    );
  }

  const classes = useStyles();
  return (
    <>
      {edit ? (
        <EditDeliveryLocation
          userId={userId}
          onEdit={eId}
          addressLine1={eAddressLine1}
          addressLine2={eAddressLine2}
          street={eStreet}
          city={eCity}
          district={eDistrict}
          state={eState}
          zipcode={eZipcode}
          onSuccess={() => editSuccess()}
        />
      ) : (
        <div>
          {props.address.address && props.address.address.length
            ? props.address.address.map((data, index) => (
                <DelivLocationCard
                  key={index}
                  id={data._id}
                  index={index}
                  user={props.user}
                  defaultAddress={props.address.defaultAddress}
                  addressLine1={data.addressLine1}
                  street={data.street}
                  city={data.city}
                  district={data.district}
                  state={data.state}
                  country="India"
                  zipcode={data.zipcode}
                  onSelect={() => child(data)}
                  onSuccessEdit={defaltAddresChild}
                />
              ))
            : null}
          {props.address && props.address.length
            ? props.address.map((data) => (
                <DelivLocationCard
                  id={data._id}
                  user={props.user}
                  defaultAddress={props.address.defaultAddress}
                  addressLine1={data.addressLine1}
                  street={data.street}
                  city={data.city}
                  district={data.district}
                  state={data.state}
                  country="India"
                  zipcode={data.zipcode}
                  onSelect={() => child(data)}
                />
              ))
            : null}
        </div>
      )}
    </>
  );
}

export default DeliveryLocation;
