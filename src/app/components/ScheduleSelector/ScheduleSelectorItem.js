import React, { useEffect, useRef, useState } from "react";
import { Grid, MenuItem, TextField } from "@material-ui/core";

const ScheduleSelectorItem = props => {
  const { checked, label, value } = props;
  const toggleChange = e => {
    props.toggleChange(e);
  };
  return (
    <>
      <span className="switchD switchDays">
        <label>
          <input
            type="checkbox"
            value={value}
            checked={checked ? true : false}
            onChange={toggleChange}
          />
          <span className="lever noselect">{label}</span>
        </label>
      </span>{" "}
    </>
  );
};

export default ScheduleSelectorItem;
