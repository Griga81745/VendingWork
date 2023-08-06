import React, { useState } from "react";
import { Grid, Box, Typography, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Menu from "./menu";
import { FormattedMessage } from "react-intl";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import FsLightbox from "fslightbox-react";

const DevicesDesktop = props => {
  const { boxStyles, classes, board, getBoards, photo } = props;
  const [toggler, setToggler] = useState(false);
  let file_path =
    !!photo[board.id] &&
    !!photo[board.id].link &&
    process.env.REACT_APP_MY_HOST_CREATIVE +
      `/boards/${board.id}/${photo[board.id].link}`;
  return (
    <>
      <Grid container classes={{ root: classes.row }}>
        <Grid
          item
          md={9}
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
        {!!board.width && !!board.height && (
          <Grid item md={1} classes={{ root: classes.dataContainer }}>
            <Typography classes={{ root: classes.data }}>
              {" "}
              {parseFloat((board.width / 100).toFixed(2))}x
              {parseFloat((board.height / 100).toFixed(2))}
            </Typography>
            <Typography classes={{ root: classes.dataHeader }}>
              Размер, м
            </Typography>
          </Grid>
        )}
        {!!board.resolution && (
          <Grid item md={1} classes={{ root: classes.dataContainer }}>
            <Typography classes={{ root: classes.data }}>
              {board.resolution}
            </Typography>
            <Typography classes={{ root: classes.dataHeader }}>
              Разрешение
            </Typography>
          </Grid>
        )}
        {/*
      <Grid item md={1} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>{board.reserved !== 0 ? board.reserved : "0"}</Typography>
          <Typography classes={{ root: classes.dataHeader }}>Занято</Typography>
      </Grid>
      <Grid item md={1} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>{board.notused !== 0 ? board.notused : "0"}</Typography>
          <Typography classes={{ root: classes.dataHeader }}>Простаивает</Typography>
      </Grid>
        <Grid item md={1} classes={{ root: classes.dataContainer }}>
            <Typography classes={{ root: classes.data }}>{board.profit !== 0 ? board.profit : "0"}</Typography>
            <Typography classes={{ root: classes.dataHeader }}>Доход</Typography>
        </Grid>
        */}
        <Grid item md={1} classes={{ root: classes.dataContainer }}>
          <Menu id={board.id} name={board.title} refreshTable={getBoards} />
        </Grid>
      </Grid>
      {!!photo[board.id] && !!photo[board.id].link && (
        <FsLightbox
          toggler={toggler}
          sources={[file_path]}
          type={
            photo[board.id].link.split(".")[1] === "jpg" ? "image" : "video"
          }
        />
      )}
    </>
  );
};

export default DevicesDesktop;
