//libraries
import React, { useState } from "react";
import useStyles from './styles';

import "../../../_metronic/_assets/scss/default.scss";
import "../../../_metronic/_assets/sass/pages/wizard/wizard-2.scss";

import "moment/locale/ru";
import LocationSettingCheckboxes from "./LocationSettingsCheckboxes";
import LocationSettingDisplay from "./LocationSettingDisplay";
import { Collapse } from "@material-ui/core";

const checkboxes1 = {
    'Авто': ['Автосалоны', 'Автосалоны', 'Автосалоны', 'Автосалоны', 'Автосалоны', 'Автосалоны', 'Автосалоны', 'Автосалоны', 'Автосалоны'],
    'Учебные заведения': ['ВУЗ', 'ВУЗ', 'ВУЗ', 'ВУЗ', 'ВУЗ', 'ВУЗ', 'ВУЗ']
}
const checkboxes2 = {
    'Разрешения': ['1920x1080', '1920x1080', '1920x1080', '1920x1080', '1920x1080', '1920x1080', '1920x1080', '1920x1080', '1920x1080'],
    'Типы инвентаря': ['Экран', 'Экран', 'Экран', 'Экран', 'Экран', 'Экран', 'Экран']
}

const LocationSettingsCollapse = (props) => {

    const classes = useStyles()

    const { setting, setSetting, getTypeBoardName, marks } = props

    return (

        <Collapse in={setting.dopSettings}>

            <div className="py-0 row row8 mb-3">
                <div className="text-md-left p8 w-100">

                    <LocationSettingCheckboxes
                        key={"messtorazmesheniya112"}
                        title='Место размещения'
                        classes={classes}
                        checkboxes={checkboxes1}
                    />

                    <LocationSettingCheckboxes
                        key={"tehharakter"}
                        title='Технические характеристики'
                        classes={classes}
                        checkboxes={checkboxes2}
                    />

                    <LocationSettingDisplay
                        key={"tehharakterDisplay"}
                        title='Параметры экрана'
                        classes={classes}
                        checkboxes={checkboxes2}
                        {...props}
                    />

                </div>
            </div>

        </Collapse>
    )
}

export default LocationSettingsCollapse
