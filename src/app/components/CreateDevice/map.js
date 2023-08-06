import React, { useEffect, useState } from "react";
import RoomIcon from "@material-ui/icons/Room";
import ReactMapboxGl, { Marker, ZoomControl } from "react-mapbox-gl";
import { Tooltip, Grid, Typography, makeStyles } from "@material-ui/core";
import axios from "axios";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoibmlja3NtaXJub3Z2IiwiYSI6ImNrazljNzg2OTB3NGEyb212cGwxNGU1ajgifQ.O7lkswQoyle4rocy5q7kyg",
  trackResize: true,
});

const useStyles = makeStyles({
  mapContainer: {
    marginTop: 20
  },
  mapMarker: {
    height: "30px",
    width: "30px",
    color: "#ea4335"
  },
  mapMarkerDataContainer: { padding: "0 10px" },
  mapMarkerData: { color: "#000" },
  mapTooltip: {
    margin: 0,
    padding: "13px 0",
    backgroundColor: "white",
    boxShadow: "1px 1px 12px 6px rgba(56, 56, 56, 0.16)"
  }
});

const DevicesMap = React.memo(props => {

  const classes = useStyles();
  // const [userLocation, setUserLocation] = useState([props.data.lng, props.data.lat]);
  const [data, setData] = useState({});
  const [userZoom, setUserZoom] = useState([15]);
  const [userCenter, setUserCenter] = useState([]);

  const [userCenterChange, setUserCenterChange] = useState([]);

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    //console.log('props.dataprops.dataprops.data1111')
   // console.log(userZoom)
    // if(userCenter[0]){
    //  }
    if (!!props.data.lat && !!props.data.lng) {
      setUserZoom([12]);
      setUserCenter([props.data.lng, props.data.lat]);


      if(!!props.data.lng && !!props.data.lat){
        clearInterval(timer);
        let stTime = setTimeout(() => {

          //console.log( "stTime = setTimeout(() => {" )
          //console.log( props.data.lng )
          //console.log( props.data.lat )


          getTimeZone(props.data, props.data.lng, props.data.lat);
        }, 2000);
        setTimer(stTime)
      }



    }else if(!props.id){
      setUserZoom([5]);
      setUserCenter(['43.77716804986855','56.409802175372505']);
      getTimeZone('43.77716804986855','56.409802175372505');
    }
  }, [props.data.lng, props.data.lat]);

  useEffect(() => {

    let dataD = {...props.data, lng: userCenterChange[0], lat: userCenterChange[1], resolution: props.data.resolutionY+"x"+props.data.resolutionX }
    props.setData( dataD );

  }, [userCenterChange]);


  const getTimeZone = async (dataD, lng, lat) => {

    console.log('getTimeZonegetTimeZonegetTimeZone ')
    console.log(lng)
    console.log(lat)
     const data = await axios.get(`https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/${lng},${lat}.json?access_token=pk.eyJ1Ijoibmlja3NtaXJub3Z2IiwiYSI6ImNrazljNzg2OTB3NGEyb212cGwxNGU1ajgifQ.O7lkswQoyle4rocy5q7kyg`);
     //console.log(data)
     //console.log(data.data.features[0].properties.TZID)
     props.setData( {...dataD, timezone: data.data.features[0].properties.TZID } );
  }


  const handleClick = (map, ev) => {

    let { lng, lat } = ev.lngLat;

   // console.log('let { lng, lat } = ev.lngLat')
    //console.log(lng)
   // console.log(lat)

    //console.log({ ...props.data, lng: lng, lat: lat })qqqqqqqqqqqqqq
    //props.setData();
    //props.setData(props.data);

    let zoom = [map.transform.tileZoom + map.transform.zoomFraction];
    setUserZoom(zoom);
    setUserCenter([lng, lat]);
    setUserCenterChange([lng, lat]);

  };

  return (
      <>
        {!!userCenter.length &&
          <Map
              // eslint-disable-next-line react/style-prop-object
              style="mapbox://styles/nicksmirnovv/ckk9ca0bp27j917p1w9oblcom"
              containerStyle={{
                height: "calc(100vh - 48px)",
                width: "100%"
              }}
              className="w-100"
              zoom={userZoom}
              //key={userCenter[0] + '' + userCenter[1]}
              center={userCenter}
              onClick={handleClick}
          >
            <ZoomControl/>
            {!!props.data.lat && !!props.data.lng && (
                <Marker coordinates={[props.data.lng, props.data.lat]} anchor="bottom">
                  <RoomIcon classes={{root: classes.mapMarker}}/>
                </Marker>
            )}
          </Map>
        }
      </>
  );
});

export default DevicesMap;
