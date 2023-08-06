import React from "react";
import Select from "react-select";

const CustomSelector = ({ onChange, ...props }) => {
  return (
    <>
      <Select
        theme={customSelectTheme}
        styles={customSelectStyles}
        {...props}
      />
    </>
  );
};

const customSelectStyles = {
  menu: (provided, state) => ({
    ...provided,
    margin: 0,
    borderRadius: state.placement === "top" ? "5px 5px 0 0" : "0 0 5px 5px"
  }),
  option: provided => ({
    ...provided,
    paddingLeft: 20
  }),
  groupHeading: provided => ({
    ...provided,
    color: "#000000",
    fontWeight: 600,
    fontSize: 12
  }),
  dropdownIndicator: provided => ({
    ...provided,
    display: "none"
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: "none"
  })
};

const customSelectTheme = theme => ({
  ...theme,
  borderWidth: 1,
  colors: {
    ...theme.colors,
    primary: "#5fccff",
    primary50: "rgba(95,204,255,0.50)",
    primary25: "#f7f8fa"
  }
});

export default CustomSelector;
