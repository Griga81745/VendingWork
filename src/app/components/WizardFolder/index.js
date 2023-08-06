import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  TextField,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableHead,
  Checkbox,
  Hidden,
  Divider
} from "@material-ui/core";
// import Input from "@material-ui/core/Input";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FormattedMessage } from "react-intl";
//import WizardDesktop from './WizardDesktop';

const useStyles = makeStyles({
  headContainer: {
    display: "flex",
    height: "54px",
    alignItems: "center",
    marginBottom: 25,
    padding: "0 25px",
    background: "linear-gradient(180deg, #f7f6f8, #ffffff)",
    marginTop: "-80px"
  },
  dataContainer: {
    alignSelf: "center",
    backgroundColor: "transparent",
    zIndex: 2
  },
  row: {
    position: "relative",
    padding: "9px 0 9px",
    minHeight: "70px",
    "&:hover": {
      backgroundColor: "#efefef"
    }
  },
  companyInfo: {
    paddingLeft: "3rem",
    backgroundColor: "transparent",
    zIndex: 2,
    alignSelf: "center"
  },
  headTitle: {
    fontSize: "1.2rem",
    fontWeight: 500,
    color: "#434349",
    paddingRight: "12px",
    marginRight: "12px",
    borderRight: "1px solid #e7e8ef"
  },
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 4,
    marginBottom: 40,
    padding: 12
  },
  infoBlock: {
    display: "grid",
    gridTemplateColumns: "35px max-content",
    gridTemplateRows: "22px 22px",
    gridTemplateAreas: "'img title''img item'",
    gridColumnGap: "12px",
    padding: "13px 10px",
    overflow: "hidden"
  },
  infoTitle: {
    gridArea: "title",
    color: "#595d6e",
    fontWeight: 600
  },
  infoItem: {
    gridArea: "item",
    color: "#48465b",
    fontWeight: 600,
    fontSize: "1.2rem"
  },
  data: {
    fontSize: 14,
    color: "#222",
    fontWeight: 500
  },
  infoImg: {
    gridArea: "img",
    display: "block",
    color: "#a2a5b9"
  },
  title: {
    fontSize: 24,
    color: "#222",
    marginBottom: 20,
    fontWeight: 500
  },
  screenInfoContainer: {
    marginBottom: 20,
    color: "#222",
    padding: "0 10px 0"
  },
  written: {
    marginTop: 20,
    marginBottom: 20,
    color: "#222",
    paddingLeft: 20
  },
  companyName: {
    color: "#222",
    fontSize: 14,
    fontWeight: 500
  },
  resultTitle: {
    fontSize: 10,
    color: "#888888"
  },
  resultData: {
    fontSize: 30,
    color: "#222",
    fontWeight: 300
  },
  inputButton: {
    width: 50,
    height: 50,
    backgroundColor: "#e1e1e1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },
  screenContainer: {
    color: "#595d6e",
    marginBottom: 20,
    padding: "0 5px 0"
  },
  screenDataText: {
    color: "black",
    fontSize: 15,
    justifyContent: "space-between"
  },
  inputButtonBlock: {
    display: "flex"
  },
  inputButton: {
    width: 33,
    height: 33,
    backgroundColor: "#e1e1e1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginLeft: 10
  },
  impressions: {
    marginTop: "13px"
  }
});

const Wizard = props => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [displaySum, setDisplaySum] = useState(0);
  const [budgetSum, setBudgetSum] = useState(0);
  const [value, setValue] = useState("");
  const [boards, setBoards] = useState([]);
  let newBoardsArray = [...boards];

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    calculation();
  }, [boards]);

  const calculation = () => {
    let displaySum = 0;
    let budgetSum = 0;
    boards.forEach(board => {
      displaySum += board.requested;
      budgetSum += board.cost;
    });
    setDisplaySum(displaySum);
    setBudgetSum(budgetSum);
  };
  const changeDisplaySum = (id, action) => {
    newBoardsArray.forEach(board => {
      if (board.id === id) {
        if (action === "add" && board.available > board.requested) {
          board.requested++;
        } else if (action === "remove" && board.requested > 0) {
          board.requested--;
        }
      }
    });
    setBoards(newBoardsArray);
  };
  const removeBoard = id => {
    for (let i = 0; i < newBoardsArray.length; i++) {
      if (newBoardsArray[i].id === id) {
        newBoardsArray.splice(i, 1);
      }
    }
    setBoards(newBoardsArray);
  };
  const getData = async () => {
    let res = await axios.get(
      `/wizard/${props.match.params.id}?subuser=${
        JSON.parse(localStorage.getItem("currentUser")).id
      }`
    );
    setData(res.data);
    setBoards(res.data.data);
  };
  const submitPayment = () => {
    let formData = new FormData();
    let boardsData = "";
    boards.forEach((board, index) => {
      if (index === 0) {
        boardsData += `{"id": ${board.id}, "requested": ${board.requested}}`;
      } else {
        boardsData += `,{"id": ${board.id}, "requested": ${board.requested}}`;
      }
    });
    formData.append("CampaignPayment[boards]", boardsData);
    formData.append("campaign_id", props.match.params.id);
    axios
      .post(
        `/campaign/payment?subuser=${
          JSON.parse(localStorage.getItem("currentUser")).id
        }`,
        formData
      )
      .then(res => {
        if (res.data.status === "fail") {
          if (res.data.error == "no_save") {
            Swal.fire("Ошибка!", "Не удалось запустить кампанию", "error");
          } else {
            Swal.fire("Ошибка!", "Что-то пошло не так!", "error");
          }
        } else if (res.data.status === "ok") {
          props.history.push(`/campaign/view/${props.match.params.id}`);
        } else {
          Swal.fire("Ошибка!", "Что-то пошло не так!", "error");
        }
      });
  };
  const changeValue = (value, id) => {
    newBoardsArray.forEach(board => {
      if (board.id === id) {
        if (Number(value) > board.available || isNaN(Number(value))) {
          board.requested = board.available;
        } else {
          board.requested = Number(value);
        }
      }
    });
    setBoards(newBoardsArray);
  };

  return (
    <>
      <Box classes={{ root: classes.headContainer }}>
        <Typography classes={{ root: classes.headTitle }}>
          Завершение создания
        </Typography>
        <span>{data.sum && data.sum.title}</span>
      </Box>
      <Grid
        container
        justify={"space-between"}
        classes={{ root: classes.infoContainer }}
      >
        <Grid item xs={12} sm={"auto"} classes={{ root: classes.infoBlock }}>
          <box classes={{ root: classes.infoImg }}>
            <i
              className="flaticon-calendar-with-a-clock-time-tools"
              style={{ fontSize: "35px", color: "#a2a5b9" }}
            ></i>
          </box>
          <Typography classes={{ root: classes.infoTitle }}>
            Начало/Конец
          </Typography>
          <Typography classes={{ root: classes.infoItem }}>
            {data.sum && data.sum.start}/{data.sum && data.sum.end}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={"auto"} classes={{ root: classes.infoBlock }}>
          <box classes={{ root: classes.infoImg }}>
            <i
              className="flaticon-responsive"
              style={{ fontSize: "35px", color: "#a2a5b9" }}
            ></i>
          </box>
          <Typography classes={{ root: classes.infoTitle }}>Экраны</Typography>
          <Typography classes={{ root: classes.infoItem }}>
            {data.sum && data.sum.boards}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={"auto"} classes={{ root: classes.infoBlock }}>
          <box classes={{ root: classes.infoImg }}>
            <i
              className="flaticon-clock-1"
              style={{ fontSize: "35px", color: "#a2a5b9" }}
            ></i>
          </box>
          <Typography classes={{ root: classes.infoTitle }}>
            Длина ролика
          </Typography>
          <Typography classes={{ root: classes.infoItem }}>
            {data.sum && data.sum.dur} сек.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={"auto"} classes={{ root: classes.infoBlock }}>
          <box classes={{ root: classes.infoImg }}>
            <i
              className="flaticon-arrows"
              style={{ fontSize: "35px", color: "#a2a5b9" }}
            ></i>
          </box>
          <Typography classes={{ root: classes.infoTitle }}>
            Разрешение
          </Typography>
          <Typography classes={{ root: classes.infoItem }}>
            {data.sum && data.sum.resolution}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={"auto"} classes={{ root: classes.infoBlock }}>
          <box classes={{ root: classes.infoImg }}>
            <i
              className="flaticon-arrows"
              style={{ fontSize: "35px", color: "#a2a5b9" }}
            ></i>
          </box>
          <Typography classes={{ root: classes.infoTitle }}>
            Размеры экранов
          </Typography>
          <Typography classes={{ root: classes.infoItem }}>
            {data.sum && data.sum.boards_size}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={"auto"} classes={{ root: classes.infoBlock }}>
          <box classes={{ root: classes.infoImg }}>
            <i
              className="flaticon-clock-1"
              style={{ fontSize: "35px", color: "#a2a5b9" }}
            ></i>
          </box>
          <Typography classes={{ root: classes.infoTitle }}>
            Время показа
          </Typography>
          <Typography classes={{ root: classes.infoItem }}>
            {data.sum && data.sum.time_shows}ч.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={"auto"} classes={{ root: classes.infoBlock }}>
          <box classes={{ root: classes.infoImg }}>
            <i
              className="flaticon-calendar-with-a-clock-time-tools"
              style={{ fontSize: "35px", color: "#a2a5b9" }}
            ></i>
          </box>
          <Typography classes={{ root: classes.infoTitle }}>
            Дни показа
          </Typography>
          <Typography classes={{ root: classes.infoItem }}>
            {data.sum && data.sum.day_shows}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={"auto"} classes={{ root: classes.infoBlock }}>
          <box classes={{ root: classes.infoImg }}>
            <i
              className="flaticon-calendar-with-a-clock-time-tools"
              style={{ fontSize: "35px", color: "#a2a5b9" }}
            ></i>
          </box>
          <Typography classes={{ root: classes.infoTitle }}>
            Заказано показов
          </Typography>
          <Typography classes={{ root: classes.infoItem }}>
            {data.sum && data.sum.shows_requested}
          </Typography>
        </Grid>
      </Grid>

      <div className="kt-portlet">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">Корзина</h3>
          </div>
        </div>
        <div className="kt-portlet__body kt-portlet__body--fit">
          <div className="kt-invoice-2">
            {boards &&
              boards.map(board => (
                <Grid container classes={{ root: classes.row }}>
                  <Grid item md={7} classes={{ root: classes.companyInfo }}>
                    <Grid
                      container
                      direction="row"
                      className="align-items-center"
                    >
                      <Typography classes={{ root: classes.companyName }}>
                        {board.title}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item md={1} classes={{ root: classes.dataContainer }}>
                    <Typography classes={{ root: classes.data }}>
                      {board.city !== 0 ? (
                        <FormattedMessage id={"CITY_" + board.city} />
                      ) : (
                        "-"
                      )}
                    </Typography>
                    <Typography classes={{ root: classes.dataHeader }}>
                      Город
                    </Typography>
                  </Grid>
                  <Grid item md={1} classes={{ root: classes.dataContainer }}>
                    <Typography classes={{ root: classes.data }}>
                      {board.available}
                    </Typography>
                    <Typography classes={{ root: classes.dataHeader }}>
                      Доступно
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={1}
                    classes={{ root: classes.inputButtonBlock }}
                  >
                    <Grid>
                      <input
                        value={board.requested}
                        onChange={e => changeValue(e.target.value, board.id)}
                        style={{
                          border: "none",
                          fontSize: "15px",
                          width: "70px"
                        }}
                      />
                      <Typography classes={{ root: classes.dataHeader }}>
                        Заказано
                      </Typography>
                    </Grid>
                    <Grid>
                      <Box
                        classes={{ root: classes.inputButton }}
                        onClick={() => changeDisplaySum(board.id, "add")}
                      >
                        <AddIcon />
                      </Box>
                      <Box
                        classes={{ root: classes.inputButton }}
                        onClick={() => changeDisplaySum(board.id, "remove")}
                      >
                        <RemoveIcon />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item md={1} classes={{ root: classes.dataContainer }}>
                    <Typography classes={{ root: classes.screenDataText }}>
                      {board.cost} &#8381;{" "}
                    </Typography>
                    <Typography>Бюджет</Typography>
                  </Grid>
                  <Grid item md={1} classes={{ root: classes.dataContainer }}>
                    <CloseIcon />
                  </Grid>
                </Grid>
              ))}

            <div className="kt-invoice__footer">
              <Grid container alignItems={"flex-end"} spacing={2}>
                <Grid item xs={12} sm={6} md={8}></Grid>
                <Grid item xs={6} sm={3} md={2}>
                  <Typography classes={{ root: classes.resultTitle }}>
                    Показов
                  </Typography>
                  <Typography classes={{ root: classes.resultData }}>
                    {displaySum}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                  <Typography classes={{ root: classes.resultTitle }}>
                    Бюджет
                  </Typography>
                  <Typography classes={{ root: classes.resultData }}>
                    {budgetSum} &#8381;{" "}
                  </Typography>
                </Grid>
              </Grid>
            </div>

            <div className="kt-invoice__actions">
              <div
                className="kt-invoice__container"
                style={{ justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  className="btn btn-brand btn-bold"
                  onClick={submitPayment}
                >
                  Запустить кампанию
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wizard;
