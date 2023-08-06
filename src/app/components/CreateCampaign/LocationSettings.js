//libraries
import React, { useState, useEffect } from "react";
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import useStyles from './styles';
import {
    Paper, CircularProgress, Grid, Button, IconButton, MenuItem, ListItemIcon,
    InputAdornment, OutlinedInput, Input, ClickAwayListener, Popper, Grow, MenuList, FormControl, InputLabel, Select,
    Checkbox, Slider, Tab as TabM, Box
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import TreeView from '@material-ui/lab/TreeView';
import PinDropIcon from '@material-ui/icons/PinDrop';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import "../../../_metronic/_assets/scss/default.scss";
import "../../../_metronic/_assets/sass/pages/wizard/wizard-2.scss";
import { Link, withRouter } from "react-router-dom";
//import Collapse from "@material-ui/core/Collapse";
// import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
// import Backdrop from '@material-ui/core/Backdrop';
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import "moment/locale/ru";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import InfoIcon from '@material-ui/icons/Info';
import TabPanel from "./TabPanel";
import StyledTreeItem from './StyledTreeItem'
import LocationSettingsCollapse from "./LocationSettingsCollapse";

const LocationSettings = (props) => {

    const classes = useStyles()
    const value = props.value
    const setting = props.setting
    const filter = props.filter
    const setSetting = props.setSetting
    const updateSetting = props.updateSetting
    const boards = props.boards
    const anchorRef = props.anchorRef
    const handleCloseSearchCity = props.handleCloseSearchCity
    const city_list = props.city_list
    const updateCompanyData = props.updateCompanyData
    const getTypeBoardName = props.getTypeBoardName
    const marks = props.marks

    return (
        <TabPanel value={value} index={0} >
            <div className={'d-flex flex-column pt-3 px-2 px-md-3'} >
                <Box className={`${classes.availbDisplays} fontGR mb-3`} >Доступно экранов <div className={`fontGM d-inline`}>{Object.keys(boards).length}</div></Box>

                <div className='py-0 mb-1'>
                    <FormControl className={'cityInput w-100 minHeight70 pNul'}>
                        <OutlinedInput
                            className="fontGR p-0"
                            placeholder={'Выберите регион'}
                            ref={anchorRef}
                            startAdornment={
                                <InputAdornment position="start">
                                    {setting.cityLoader ? <CircularProgress style={{ width: 20, height: 20 }} /> :
                                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.00184 14.8807L10.7089 11.1737C11.442 10.4405 11.9412 9.50642 12.1435 8.48952C12.3457 7.47263 12.2418 6.4186 11.845 5.46073C11.4483 4.50285 10.7763 3.68415 9.91425 3.10814C9.05217 2.53213 8.03865 2.22469 7.00184 2.22469C5.96503 2.22469 4.9515 2.53213 4.08942 3.10814C3.22734 3.68415 2.55542 4.50285 2.15862 5.46073C1.76183 6.4186 1.65798 7.47263 1.86022 8.48952C2.06245 9.50642 2.56168 10.4405 3.29477 11.1737L7.00184 14.8807ZM7.00184 16.9986L2.23583 12.2326C1.29321 11.29 0.651287 10.089 0.391225 8.78158C0.131163 7.47413 0.264645 6.11892 0.77479 4.88733C1.28494 3.65574 2.14883 2.60308 3.25724 1.86247C4.36564 1.12186 5.66877 0.726563 7.00184 0.726562C8.3349 0.726562 9.63803 1.12186 10.7464 1.86247C11.8548 2.60308 12.7187 3.65574 13.2289 4.88733C13.739 6.11892 13.8725 7.47413 13.6124 8.78158C13.3524 10.089 12.7105 11.29 11.7678 12.2326L7.00184 16.9986ZM7.00184 8.96442C7.39908 8.96442 7.78005 8.80662 8.06094 8.52573C8.34184 8.24483 8.49964 7.86386 8.49964 7.46662C8.49964 7.06938 8.34184 6.68841 8.06094 6.40751C7.78005 6.12662 7.39908 5.96882 7.00184 5.96882C6.60459 5.96882 6.22362 6.12662 5.94273 6.40751C5.66184 6.68841 5.50403 7.06938 5.50403 7.46662C5.50403 7.86386 5.66184 8.24483 5.94273 8.52573C6.22362 8.80662 6.60459 8.96442 7.00184 8.96442ZM7.00184 10.4622C6.20735 10.4622 5.44541 10.1466 4.88362 9.58483C4.32184 9.02305 4.00623 8.2611 4.00623 7.46662C4.00623 6.67213 4.32184 5.91019 4.88362 5.3484C5.44541 4.78662 6.20735 4.47101 7.00184 4.47101C7.79632 4.47101 8.55827 4.78662 9.12005 5.3484C9.68184 5.91019 9.99744 6.67213 9.99744 7.46662C9.99744 8.2611 9.68184 9.02305 9.12005 9.58483C8.55827 10.1466 7.79632 10.4622 7.00184 10.4622Z" fill="#78909C" />
                                        </svg>}
                                </InputAdornment>
                            }
                            endAdornment={function () {
                                if (setting.searchCityInput !== '') {
                                    return <InputAdornment position="end" className={'cursor-pointer mr-3'} onClick={() => {
                                        setSetting({ ...setting, searchCityInput: '' })
                                    }}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#78909C" />
                                        </svg>
                                    </InputAdornment>
                                }
                            }()}
                            onChange={(event) => {
                                let val = event.target.value;
                                let obj = {}
                                if (val.length > 2) {
                                    if (!setting.cityLoader) {
                                        obj.cityLoader = true;
                                        obj.openSearchCity = true;
                                    }
                                }
                                obj.searchCityInput = val;
                                updateSetting({ ...setting, ...obj });

                            }}
                            //disableUnderline={true}
                            value={setting.searchCityInput}
                        />
                    </FormControl>
                </div>
                <Popper open={setting.openSearchCity} anchorEl={anchorRef.current}
                    className={'w-100'} style={{ padding: '0px 12px', 'zIndex': 999 }}
                    role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: 'left bottom' }}
                        >
                            <Paper elevation={7}>
                                <ClickAwayListener onClickAway={(e) => handleCloseSearchCity(e, "")}>
                                    <MenuList autoFocusItem={setting.openSearchCity} id="menu-list-grow">
                                        {!!setting.searchCityInput && setting.searchCityInput.length > 2 && city_list.map((val, key) => {
                                            //if(key == 0){
                                            // setTimeout(()=>{
                                            //      updateSetting({ ...setting, cityLoader: false });
                                            //  }, 400)
                                            // }
                                            ///if(!setting.searchCityInput || setting.searchCityInput.length < 3){
                                            //     return;
                                            //}
                                            console.log('setting.searchCityInput')
                                            console.log(setting.searchCityInput)
                                            console.log(val.title)
                                            if (val.title.toUpperCase().indexOf(setting.searchCityInput.toUpperCase()) > -1) {
                                                return <MenuItem onClick={(e) => handleCloseSearchCity(e, val)}>
                                                    <ListItemIcon style={{ 'minWidth': '39px' }}>
                                                        <PinDropOutlinedIcon />
                                                    </ListItemIcon>
                                                    <Box fontWeight={500} fontSize={13}>{val.title}</Box>
                                                </MenuItem>
                                            }
                                        })}

                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                {!!filter.city.length &&
                    <div className="px-0 py-1 w-100 5566666">
                        {filter.city.map((city, index) => {
                            return <div className={'slideLineBageC'}>
                                <CloseIcon className={'fileSremove'} onClick={() => {
                                    let arr = filter.city.filter(item => item.value !== city.value);
                                    updateCompanyData({ ...filter, city: arr });
                                }
                                } />
                                <div className={'slideLineBage d-flex py-2'}>
                                    <Grid container direction="row"
                                        className="align-items-center mr-auto">
                                        <ListItemIcon style={{ 'minWidth': '39px' }}>
                                            <PinDropOutlinedIcon style={{ color: '#18d7aa' }} />
                                        </ListItemIcon>
                                        <Grid className={'title city'}>
                                            {city.title}
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        }
                        )}
                    </div>
                }

                {/* // Блок тип инвентаря //////////////////////////////////////////////////////////////////////////////// */}

                <div className="py-0 mb-2">
                    <FormControl variant="outlined" className={'w-100 minHeight70'}>
                        <InputLabel>Тип инвентаря</InputLabel>
                        <Select
                            label="Тип инвентаря"
                            value={setting.typeRekKonstrukzii}
                            onChange={(event, newValue) => {
                                setSetting({
                                    ...setting,
                                    typeRekKonstrukzii: newValue.props.value
                                })
                            }}
                        >
                            <MenuItem value={3}>Outdoor + Indoor</MenuItem>
                            <MenuItem value={1}>Outdoor</MenuItem>
                            <MenuItem value={2}>Indoor</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="py-0 c455A64 text-center">
                    <Link className="c455A64 underL mb-2 fS14" href="#" to="#" onClick={(e) => {
                        e.preventDefault();
                        console.log('setting ,kzlm', setting.dopSettings)
                        updateSetting({
                            ...setting,
                            dopSettings: !setting.dopSettings
                        })
                    }} >
                        {`${!setting.dopSettings ? 'Показать' : 'Скрыть'} дополнительные настройки`}
                    </Link>
                </div>

                <LocationSettingsCollapse
                    setting={setting}
                    setSetting={setSetting}
                    getTypeBoardName={getTypeBoardName}
                    marks={marks}
                />

            </div>
        </TabPanel>
    )
}

export default LocationSettings
