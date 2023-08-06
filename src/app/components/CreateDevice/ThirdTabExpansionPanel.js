import React, { useState } from "react";
import TabExpansion from "../common/TabExpansion";

const ThirdTabExpansionPanel = props => {
  const [expanded, setExpanded] = useState(props.id);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {!!props.albums.length &&
        props.albums.map((i, ndx) => {
          return (
            <TabExpansion
              key={ndx}
              data={i}
              expanded={expanded}
              handleChange={handleChange}
              selectFile={props.selectFile}
              filesForSefected={props.filesForSefected}
              resolutions={props.resolutions}
            />
          );
        })}
    </>
  );
};

export default ThirdTabExpansionPanel;
