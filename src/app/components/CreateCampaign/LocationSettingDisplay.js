//libraries
import React, { useState } from "react";
import { FormControlLabel, Checkbox, Tab as TabM, TextField, Divider, Typography, makeStyles, Collapse, FormControl } from "@material-ui/core";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../../../_metronic/_assets/scss/default.scss'
import "../../../_metronic/_assets/sass/pages/wizard/wizard-2.scss";
import "moment/locale/ru";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import StyledTreeTitle from "./StyledTreeTitle";

const useStyles = makeStyles({
    settingsContainer: {
        marginTop: '.7rem',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px 15px'
    },
    allItemsTitle: {
        fontSize: '14px'
    },
});

const LocationSettingDisplay = props => {

    const { classes, setting, setSetting } = props
    const localClasses = useStyles()

    return (
        <TreeView
            className={classes.rootTree}
            style={{ maxWidth: '100%' }}
            defaultExpanded={['3']}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.44231 5.96875L5.77031 2.29675L2.09831 5.96875L0.970312 4.83275L5.77031 0.0327505L10.5703 4.83275L9.44231 5.96875Z" fill="#78909C" />
            </svg>}
            defaultEndIcon={<div style={{ width: 24 }} />}
        >
            <StyledTreeTitle nodeId="1"

                labelText="Параметры экрана"
                active={true}
                clickHandle={(event) => { }}
            >
                <div className={localClasses.settingsContainer}>
                    <FormControlLabel
                        style={{ width: '100%', margin: '0' }}
                        control={<Checkbox checked={setting.orientationG}
                            onChange={e => {
                                setSetting({ ...setting, orientationG: !setting.orientationG })
                            }} name="Auto" />}
                        label={<Typography style={{ fontSize: '14px' }}>Горизонтальная ориентация</Typography>}
                    />
                    <FormControlLabel
                        style={{ width: '100%', margin: '0' }}
                        control={<Checkbox checked={setting.orientationV}
                            onChange={e => {
                                setSetting({ ...setting, orientationV: !setting.orientationV })
                            }} name="Auto" />}
                        label={<Typography style={{ fontSize: '14px' }}>Вертикальная ориентация</Typography>}
                    />
                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <Typography style={{ width: '100%', fontSize: '14px' }}>
                            Ширина, м
                        </Typography>
                        <FormControl style={{ width: 'calc(50% - 3px)', marginTop: '10px' }}>
                            <TextField
                                variant="outlined"
                                className="minHeight70"
                                label={"м"}
                                helperText=""
                                type="number"
                                // value={setting.budgetType3}
                                fullWidth
                                onChange={e => {
                                    let resSh = e.target.value.replace(/[^0-9]/g, "");
                                    resSh = resSh.replace(/^0+/, "");
                                    setSetting({ ...setting, budgetType3: resSh })
                                }}
                            />
                        </FormControl>

                        <FormControl style={{ width: 'calc(50% - 3px)', marginTop: '10px' }}>
                            <TextField
                                variant="outlined"
                                className="minHeight70"
                                label={"м"}
                                helperText=""
                                type="number"
                                // value={setting.budgetType3}
                                fullWidth
                                onChange={e => {
                                    let resSh = e.target.value.replace(/[^0-9]/g, "");
                                    resSh = resSh.replace(/^0+/, "");
                                    setSetting({ ...setting, budgetType3: resSh })
                                }}
                            />
                        </FormControl>
                    </div>

                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <Typography style={{ width: '100%', fontSize: '14px' }}>
                            Высота, м
                        </Typography>
                        <FormControl style={{ width: 'calc(50% - 3px)', marginTop: '10px' }}>
                            <TextField
                                variant="outlined"
                                className="minHeight70"
                                label={"м"}
                                helperText=""
                                type="number"
                                // value={setting.budgetType3}
                                fullWidth
                                onChange={e => {
                                    let resSh = e.target.value.replace(/[^0-9]/g, "");
                                    resSh = resSh.replace(/^0+/, "");
                                    setSetting({ ...setting, budgetType3: resSh })
                                }}
                            />
                        </FormControl>

                        <FormControl style={{ width: 'calc(50% - 3px)', marginTop: '10px' }}>
                            <TextField
                                variant="outlined"
                                className="minHeight70"
                                label={"м"}
                                helperText=""
                                type="number"
                                // value={setting.budgetType3}
                                fullWidth
                                onChange={e => {
                                    let resSh = e.target.value.replace(/[^0-9]/g, "");
                                    resSh = resSh.replace(/^0+/, "");
                                    setSetting({ ...setting, budgetType3: resSh })
                                }}
                            />
                        </FormControl>
                    </div>

                </div>

            </StyledTreeTitle>

        </TreeView>
    )
}

export default LocationSettingDisplay
