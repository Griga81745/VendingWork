import React from "react";
import RoomIcon from "@material-ui/icons/Room";
import ReactMapboxGl, { Marker, ZoomControl } from "react-mapbox-gl";
import { Tooltip, Grid, Typography, makeStyles } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

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
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1Ijoic291cmNlbWF0ZXMiLCJhIjoiY2s2OTRveXhkMDlmYTNubWZvcWszN2F2byJ9.6I7HVZnBez7J54Tftk_2pQ",
    scrollZoom: false
  });
  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "300px",
        width: "100%"
      }}
      center={[44.039406, 56.323852]}
    >
      <ZoomControl />
      {!!props.boards &&
        props.boards.map(board => (
          <Marker
            coordinates={[board.lng, board.lat]}
            anchor="bottom"
            key={board.id}
          >
            <Tooltip
              placement="top"
              classes={{ tooltip: classes.mapTooltip }}
              title={
                <Grid
                  container
                  direction="column"
                  classes={{ root: classes.mapMarkerDataContainer }}
                >
                  <Typography classes={{ root: classes.mapMarkerData }}>
                    {board.title}
                  </Typography>
                  <Typography classes={{ root: classes.mapMarkerData }}>
                    <FormattedMessage id={"CITY_" + board.city} />
                  </Typography>
                  <Typography classes={{ root: classes.mapMarkerData }}>
                    {board.description}
                  </Typography>
                </Grid>
              }
            >
              <RoomIcon classes={{ root: classes.mapMarker }} />
            </Tooltip>
          </Marker>
        ))}
    </Map>
  );
});

export default DevicesMap;
