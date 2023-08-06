import React, { useState } from "react";
import { Box } from "@material-ui/core";

const ProgressLoader = props => {
  const { progress } = props;

  return (
    <>
      <div className="kt-widget24">
        <div className="kt-widget24__details">
          <div className="kt-widget24__info">
            <span className="kt-widget24__desc">Загрузка файла</span>
          </div>
        </div>
        <div className="progress progress--sm">
          <Box
            className="progress-bar kt-label-bg-color-1"
            width={!!progress ? `${progress}%` : "0%"}
          ></Box>
        </div>
        <div className="kt-widget24__action">
          <span className="kt-widget24__number">
            {!!progress ? progress : "0"}%
          </span>
        </div>
      </div>
    </>
  );
};

export default ProgressLoader;
