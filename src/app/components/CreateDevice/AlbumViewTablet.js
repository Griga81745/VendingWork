import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Avatar } from "@material-ui/core";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import FsLightbox from "fslightbox-react";
import Menu from "./menu";

const AlbumViewDesktop = props => {
  const { classes, option, getBoardInfo, id, type, currentUser} = props;
  const [toggler, setToggler] = useState(false);
  let file_path = option.path_url + option.link;
  return (
      <div className={'d-flex slideLineBage py-2 px-4 align-items-center'}>

        <Grid onClick={() => setToggler(!toggler)} >
          <Avatar
              variant="rounded"
              src={`${option.id == 'default' ? option.path_url : `https://st.de4.ru/boards/${id}`}/${option.id == 'default' ? "" : "thumb"}${
                  option.link.split(".")[0]
              }.${option.link.split(".")[1] == "jpeg" ? "jpeg" : "jpg"}`}
              className="mr-2"
          />
        </Grid>


        <div className="align-self-center col d-flex flex-column ">
          <Box fontSize={14} >{option.title.substring(0, 50)}</Box>
          <div>
            {option.filesize &&
            <div className={'fileArguments d-inline'}>
                                    <span>
                                      {option.filesize !== 0
                                          ? (option.filesize / 1024 / 1024).toFixed(2)
                                          : "-"}
                                    </span>
              <span className={'fileSm'}>Мб</span>
            </div>
            }
            <Grid className={'fileArguments d-inline'}>{option.mime}</Grid>
          </div>
        </div>


        {option.id != 'default' &&
        <Menu item={option} getBoardInfo={getBoardInfo} type={type} currentUser={currentUser} />
        }

      </div>
  );
};

export default AlbumViewDesktop;
