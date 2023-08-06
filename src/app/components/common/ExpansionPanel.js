import React, { useState, useEffect } from "react";
import TabExpansion from "./TabExpansion";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Scrollbars } from 'react-custom-scrollbars';
import SwipeableViews from "react-swipeable-views";
// import AccordionDetails from "@material-ui/core/AccordionDetails";

const useStyles = makeStyles(theme => ({
  linkBlock: {
    padding: "10px 10px 9px 10px",
    borderTop: "1px solid #E3E5E5",
    "&:hover": {
      backgroundColor: "#F5F5F5",
    },
  },
  block: {
    height: "257px !important"
  },
}));
const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: '#B0BEC5'
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
}
const CustomScrollbars = props => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
)

const ExpansionPanel = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(props.id);

  const [i, setI] = useState(0);
  const [ndx, setNdx] = useState(0);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangeTab = (newValue, ii) => {
    setI(ii)
    props.setOpenAl(newValue);
  };
  const handleChangeIndex = index => {
    props.setOpenAl(index);
  };

  useEffect(() => {
    console.log('props.albumsn props.albumsing ');
    console.log(props.albumsList);
  }, [props.albumsList]);

  return (
    <SwipeableViews
      axis={'x-reverse'}
      disabled={true}
      index={props.openAl}
    // onChangeIndex={(index) => {
    //   if(props.openAl !== index){
    //     handleChangeIndex(index)
    //     setTimeout(() => {
    //       handleChangeIndex(props.openAl)
    //     });
    //   }
    // }}
    // onSwitching={index => {
    //   console.log('props onSwitchingonSwitchingonSwitching ');
    //   console.log(index);
    // }}
    >
      <TabPanel value={props.openAl} index={0} >
        <CustomScrollbars key={"scroll11"} className={`${classes.block}`} autoHide autoHideTimeout={500} autoHideDuration={200}>
          {!!Object.keys(props.albumsList).length && Object.values(props.albumsList).map((i, ndx) => {
            return (
              <div key={i.name + "albumN" + i.id} className={`${classes.linkBlock} pl-3 noselect cursor-pointer`}
                onClick={() => handleChangeTab(1, i)}
              >{i.name}</div>
            );
          })}
        </CustomScrollbars>
      </TabPanel>
      <TabPanel value={props.openAl} index={1} >
        {props.openAl !== 0 &&
          <CustomScrollbars key={"scroll22"} className={`${classes.block}`} autoHide autoHideTimeout={500} autoHideDuration={200}>
            <TabExpansion
              data={i}
              key={"TabExpansion1111"}
              filesForSefected={props.filesForSefected}
              selectFile={props.selectFile}
              albumsList={props.albumsList}
              choosedCreatives={props.choosedCreatives}
              addFileToCamp={props.addFileToCamp}
              uploadedFiles={props.uploadedFiles}
              setUploadedFiles={props.setUploadedFiles}
              resolutions={props.resolutions}
              radio_find={props.radio_find}
              filter={props.filter}
            />
          </CustomScrollbars>
        }
      </TabPanel>
    </SwipeableViews>
  )
}
export default ExpansionPanel;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}-${value}`}
      {...other}
    >

      {value === index && (
        <Box>{children}</Box>
      )}
    </div>
  );
}
