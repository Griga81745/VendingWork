import React, { useState } from "react";
import {Avatar, Box, IconButton, Tooltip} from "@material-ui/core";

const ProgressLoader = props => {
  const { progress, name } = props;

  return (

        <div className="filesUpload py-1 px-4 d-flex align-items-center">
          <div>{!!progress ? progress : "0"}%</div>
          <div className={'ml-3 w-100'}>
            <span>{name}</span>
            <div className="progress progress--sm m-0 mb-1">
              <Box
                  className="progress-bar kt-label-bg-color-1"
                  width={!!progress ? `${progress}%` : "0%"}
              ></Box>
            </div>
          </div>
        </div>

  );
};
export default ProgressLoader;
