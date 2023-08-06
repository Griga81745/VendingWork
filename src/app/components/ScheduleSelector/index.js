import React, { useEffect, useRef, useState } from "react";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import ScheduleSelectorItem from "./ScheduleSelectorItem";

const ScheduleSelector = props => {
  const toggleChange = e => {
    props.onChange(e);
  };
  //useEffect(() => {
  //    console.log('sddadasdas')
  //    console.log(props.selection)
  //}, [props.selection]);
  return (
    <>
      {props.selection.map(team => (
        <ScheduleSelectorItem
          key={team.value}
          label={team.label}
          value={team.value}
          checked={team.checked}
          toggleChange={toggleChange}
        />
      ))}
      {!!props.error && <p className="text-danger">Обязательное поле</p>}
    </>
  );
};

export default ScheduleSelector;
