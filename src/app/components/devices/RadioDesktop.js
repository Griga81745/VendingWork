import React, { useState } from "react";
import { Grid, Box, Typography, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Menu from "./menuRadio";
import { FormattedMessage } from "react-intl";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import FsLightbox from "fslightbox-react";

const DevicesDesktop = props => {
  const { boxStyles, classes, board, getBoards, photo } = props;
  const [toggler, setToggler] = useState(false);
  return (
    <>
      <Grid container classes={{ root: classes.row }}>
        <Grid
          item
          md={11}
          classes={{ root: classes.companyInfo }}
          className={!!photo[board.id] && !!photo[board.id].link && "d-flex"}
        >
          {!!photo[board.id] && !!photo[board.id].link && (
            <Avatar
              style={{ cursor: "pointer" }}
              variant="rounded"
              onClick={() => setToggler(!toggler)}
              src={
                process.env.REACT_APP_MY_HOST_CREATIVE +
                `/boards/${board.id}/thumb${photo[board.id].link}`
              }
              className="mr-2"
            />
          )}
          <div>
            <Typography classes={{ root: classes.companyName }}>
              <Link to={`/myboards/view/${board.id}`} className="C-NameHover">
                {board.title}
              </Link>
            </Typography>

            {!!board.city && (
              <Typography classes={{ root: classes.companyDates }}>
                <FormattedMessage id={"CITY_" + board.city} />
              </Typography>
            )}
          </div>
        </Grid>

        <Grid item md={1} classes={{ root: classes.dataContainer }}>
          <Menu id={board.id} name={board.title} refreshTable={getBoards} />
        </Grid>
      </Grid>
    </>
  );
};

export default DevicesDesktop;
