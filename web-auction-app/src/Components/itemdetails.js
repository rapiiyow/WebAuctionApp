import { getSelectedItem, getUser } from "../Utils/common";
import React, { useRef, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

function ItemDetails(props) {
  const [itemDetail, setItemDetail] = useState([]);
  const [bidNow, setBidNow] = useState(0);
  const [isAutoBid, setIsAutoBid] = useState(0);
  const [labelText, setLabelText] = useState("");
  const selectedItemId = getSelectedItem();
  const currentUserId = getUser();

  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = async () => {
    // const countDownDate = new Date(itemDetail.CloseDateTime).getTime();
    const data = await axios.get(
      process.env.REACT_APP_API + "item/" + selectedItemId + "/" + currentUserId
    );
    setItemDetail(data.data[0]);
    console.log(data.data[0].CloseDateTime);

    const countDownDate = new Date(data.data[0].CloseDateTime).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  const submitBidding = () => {
    axios
      .post(process.env.REACT_APP_API + "item", {
        ItemId: selectedItemId,
        UserId: currentUserId,
        BidAmount: bidNow,
      })
      .then(function (response) {
        console.log(response);
        props.history.push("/home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const submitAutoBid = () => {
    axios
      .post(process.env.REACT_APP_API + "item/AutoBid", {
        ItemId: selectedItemId,
        UserId: currentUserId,
        UserBudget: bidNow,
      })
      .then(function (response) {
        console.log(response);
        props.history.push("/home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const backToHome = (e) => {
    props.history.push("/home");
  };

  const getInputvalue = (e) => {
    setBidNow(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentUserId === itemDetail.TopBidder) {
      alert("You are the highest bidder of this item");
    } else {
      if (bidNow < itemDetail.ItemPrice) {
        alert("Bid amount should be higher than item price");
      } else if (bidNow <= itemDetail.BidAmount) {
        alert("Bid amount should be higher than last bid amount");
      } else {
        if (window.confirm("Do you want to submit your bid?")) {
          if (
            timerDays <= 0 &&
            timerHours <= 0 &&
            timerMinutes <= 0 &&
            timerSeconds <= 0
          ) {
            alert("The bidding is closed");
          } else {
            if (isAutoBid === true) {
              submitAutoBid();
            } else {
              submitBidding();
            }
          }
        }
      }
    }
  };

  const checkAutoBid = (e) => {
    let isChecked = e.target.checked;
    setIsAutoBid(isChecked);

    if (isChecked) {
      setLabelText("Set Auto Bid Limit");
    } else {
      setLabelText("Bid Now");
    }
  };

  useEffect(() => {
    startTimer();
    setLabelText("Bid Now");
    return () => {
      setItemDetail([]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearInterval(interval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "70vh",
    },
    image: {
      backgroundImage: "url(" + itemDetail.Base64String + ")",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "contain",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h3" color="primary">
            {itemDetail.ItemName}
          </Typography>
          <Typography component="h1" variant="h6">
            Description: {itemDetail.ItemDescription}
          </Typography>
          <Typography component="h1" variant="h5">
            Price: ${itemDetail.ItemPrice}
          </Typography>
          <Typography component="h1" variant="h5">
            Bid will close in: {timerDays}:{timerHours}:{timerMinutes}:
            {timerSeconds}
          </Typography>
          <Typography component="h1" variant="h5">
            Highest Bid: ${itemDetail.BidAmount}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              type="number"
              min="1"
              step="any"
              label={labelText}
              id="outlined-size-normal"
              variant="outlined"
              onChange={getInputvalue}
            />
            <br />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={checkAutoBid}
                />
              }
              label="Enable Auto Bid"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Submit Bid
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={backToHome}
            >
              Back
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default ItemDetails;
