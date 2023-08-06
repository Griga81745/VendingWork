//libraries
import React, { useState } from "react";
import { FormControlLabel, Checkbox, Divider, Typography } from "@material-ui/core";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "../../../_metronic/_assets/scss/default.scss";
import "../../../_metronic/_assets/sass/pages/wizard/wizard-2.scss";
import "moment/locale/ru";
//import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
//import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import StyledTreeTitle from "./StyledTreeTitle";

const LocationSettingCheckboxes = (props) => {

    const createShowItemsObj = (items) => {
        const numberItems = {}
        let key
        for (key in items) {
            numberItems[key] = items[key]
            numberItems[key] = 4
        }
        return numberItems
    }

    const { classes, checkboxes, title } = props
    const [numberItemsToShow, setNumberItemsToShow] = useState(createShowItemsObj(checkboxes))

    const style = {
        checkboxLabel: {
            fontSize: '14px'
        },
        commonCheckboxNote: {
            fontSize: '14px',
            color: '#B0BEC5'
        }
    }

    return (
        <TreeView
            className={`${classes.rootTree} mb-2`}
            style={{ maxWidth: '100%' }}
            defaultExpanded={['3']}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.44231 5.96875L5.77031 2.29675L2.09831 5.96875L0.970312 4.83275L5.77031 0.0327505L10.5703 4.83275L9.44231 5.96875Z" fill="#78909C" />
            </svg>
            }
            defaultEndIcon={<div style={{ width: 24 }} />}
        >
            <StyledTreeTitle nodeId="1"
                labelText={title}
                active={true}
                clickHandle={(event) => { }}
            >
                {Object.keys(checkboxes).map((el, index) => {
                    return (
                        <React.Fragment key={'cCheckbox' + index} >
                            <div className='d-flex' style={{ alignItems: 'center' }}>
                                <FormControlLabel
                                    style={{ margin: '0 10px 0 0' }}
                                    control={<Checkbox onChange={null} color='primary' name="Auto" />}
                                    label={<Typography style={style.checkboxLabel}>{el}</Typography>}
                                />
                                <Typography style={style.commonCheckboxNote}>{checkboxes[el].length}</Typography>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {checkboxes[el].slice(0, numberItemsToShow[el]).map((elem, index2) => {
                                    return (
                                        <FormControlLabel
                                            key={'LoSeCheckbox' + index2}
                                            style={{ width: '50%', margin: '0', maxHeight: '36px' }}
                                            control={<Checkbox onChange={null} name={elem} color='primary' />}
                                            label={<Typography style={style.checkboxLabel} className='fontGR'>{elem}</Typography>}
                                        />
                                    )
                                })}
                            </div>
                            <div className='fontGR'
                                style={{
                                    width: '100%',
                                    cursor: 'pointer',
                                    padding: '5px 10px',
                                    textDecoration: 'underline dashed',
                                    fontSize: '14px'
                                }}
                                onClick={() => {
                                    const newNumber = numberItemsToShow[el] === 4 ? checkboxes[el].length : 4
                                    setNumberItemsToShow({ ...numberItemsToShow, [el]: newNumber })
                                }}
                            >
                                Показать все
                            </div>

                            {index + 1 !== Object.keys(checkboxes).length && <Divider style={{ margin: '.7rem 0' }} />}
                        </React.Fragment>
                    )
                })}

            </StyledTreeTitle>


        </TreeView>
    )
}

export default LocationSettingCheckboxes
