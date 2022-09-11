import React, { useState } from "react";
import './App.css';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import LoadingGif from "../src/loading.gif"
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
//Implement Counter to count number of times user has checked their crypto losses
import { useSelector, useDispatch } from "react-redux";
import {
increment,
} from "./redux/action"; 

function App() {
  const BASE_API_URL = "https://api.coingecko.com/api/v3";
  const [curr, setCurr] = React.useState('bitcoin');
  const [date, setDate] = React.useState('');
  const [amount, setAm] = React.useState('');
  const [initPrice, setinitPrice] = React.useState('100');
  const [todayPrice, settodayPrice] = React.useState('150');
  const [perc, setPerc] = React.useState(Number);
  const [finalAmount, setfinalAmount] = React.useState(Number);
  const [posneg, setposneg] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurr((event.target as HTMLInputElement).value);
  };


  const handleSubmit = () => {
    dispatch(increment())
    todaysDate()
    setLoading(true);
    console.log(curr + date + amount)
    //Get The Price when initially bought
    axios
      .get(BASE_API_URL + "/coins/" + curr + "/history", { params: { date: dateConvertToApi(), localization: false } })
      .then((res) => {
        console.log("Initial Price:" + res.data.market_data.current_price.nzd)
        setinitPrice(res.data.market_data.current_price.nzd);
        let initialPrice = parseFloat(res.data.market_data.current_price.nzd)
        axios
          .get(BASE_API_URL + "/simple/price", { params: { ids: curr, vs_currencies: "nzd" } })
          .then((res1) => {
            const data = JSON.stringify(res1.data)
            //let num = data.replace(/\D/g,'');
            let num = data.replace(/[^\d.]+/g, '');
            console.log("Todays Price:" + num)
            let currentPrice = parseFloat(num)
            settodayPrice(num);

            //Get percentage change
            var percDiff = 1 - ((initialPrice - currentPrice) / (initialPrice));
            console.log("Per Dif" + percDiff)
            setPerc(percDiff)
            if (percDiff >= 1) {
              setposneg("P")
            } else {
              setposneg("N")
            }

            //Calculate what the investment is worth now
            setfinalAmount(parseFloat(amount) * percDiff)
            console.log(finalAmount)
            console.log(parseFloat(amount) * percDiff)
            setLoading(false)

          })
          .catch((err) => {
            console.log("Todays Crypto Not Found");
            setinitPrice('');
            return "first Fail"
          });

      })
      .catch((err) => {
        console.log("Crypto Not Found");
        setinitPrice('');
      });

  }
  const dateConvertToApi = () => {
    const input = date
    const [year, month, day] = input.split('-')
    return (day + "-" + month + "-" + year)
  }
  //This function will return todays Date to use as the max in the date field
  const todaysDate = () => {
    let today = new Date();
    return (today.getFullYear() + "-" + today.toLocaleString("en-US", { month: '2-digit' }) + "-" + today.toLocaleString("en-US", { day: '2-digit' }))
  }
  //Redux Code
  const counter = useSelector((state : any) => state.counter);
  const dispatch = useDispatch();




  return (
    <Box>

      <Box display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      ><h1>Calculate Crypto Gains/Losses</h1>
      </Box>
      <LoginButton />
      <LogoutButton />
      <Profile></Profile>
      <div>
      <h3>Attempts to ignore Losses</h3>
      <h3>{counter}</h3>
      </div>

      <Box display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Box sx={{
          width: '30%',

          backgroundColor: 'LightBlue',
          borderColor: 'pink',
        }}>
          <form>
            <FormGroup
              sx={{
                padding: 2,
                height: '100%',
                borderRadius: 2,
                border: "1px solid",
                borderColor: "primary.main",
              }}
            >
              <FormLabel component="legend">Initial Investment</FormLabel>
              <TextField
                sx={{ paddingBottom: 2 }}
                type="number"
                name="initValue"
                variant="outlined"
                placeholder="$100"
                value={amount}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(prop: any) => {
                  setAm(prop.target.value);
                }}
                required
              />
              <FormControl>
                <FormLabel id="currency">Select Currency</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="radio-group"
                  name="Crypto"
                  value={curr}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel value="bitcoin" control={<Radio />} label="Bitcoin" />
                  <FormControlLabel value="ethereum" control={<Radio />} label="Ethereum" />
                  <FormControlLabel value="ripple" control={<Radio />} label="Ripple" />
                  <FormControlLabel value="dogecoin" control={<Radio />} label="Doge Coin" />
                </RadioGroup>
              </FormControl>

              <Typography component="legend">Date Of Investment</Typography>
              <TextField
                required
                margin="dense"
                id="dateInit"
                value={date}
                label=""
                type="date"
                fullWidth
                variant="standard"
                InputProps={{ inputProps: { max: todaysDate() } }}
                onChange={(e) => setDate(e.target.value)}
              />
              <Button variant="outlined" onClick={handleSubmit}>Submit</Button>

            </FormGroup>
          </form>
        </Box>

        <Box sx={{
          width: '30%',
          height: '55%',
          backgroundColor: 'LightCoral',
          borderColor: 'pink',
          display: "flex",
          justifyContent: "center",
          alignItems: "center"

        }}>
          <div>
            {loading ? <div> <img alt="Loading" src={LoadingGif} /> </div> : <Box textAlign="center" display="flex" justifyContent="center" alignItems="center" > <h2>Your Investment is now worth a whopping ${finalAmount.toFixed(2)}, from an initial of ${amount}</h2></Box>
            }
          </div>
        </Box>

      </Box>
    </Box>
  );
}

export default App;
