import React, { useState } from "react";
import './App.css';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";



function App() {
  const BASE_API_URL = "https://api.coingecko.com/api/v3";
  const [curr, setCurr] = React.useState('bitcoin');
  const [date, setDate] = React.useState('');
  const [amount, setAm] = React.useState('');
  const [initPrice, setinitPrice] = React.useState('100');
  const [todayPrice, settodayPrice] = React.useState('150');


  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurr((event.target as HTMLInputElement).value);
  };
  const getInitPrice = async() => {
    //console.log(dateConvertToApi())
    await axios
      .get(BASE_API_URL + "/coins/" + curr + "/history" , { params: { date: dateConvertToApi(),localization:false } })
      .then((res) => {
        console.log("Initial Price:"+res.data.market_data.current_price.nzd)
        setinitPrice(res.data.market_data.current_price.nzd);
      })
      .catch((err) => {
        console.log("Crypto Not Found");
        setinitPrice('');
      });
  }

  const getTodayPrice = async() => {
    //console.log(dateConvertToApi())
    await axios
      .get(BASE_API_URL + "/simple/price" , { params: { ids: curr, vs_currencies:"nzd" } })
      .then((res) => {
        const data = JSON.stringify(res.data)
        let num = data.replace(/\D/g,'');
        settodayPrice(num);
      })
      .catch((err) => {
        console.log("Todays Crypto Not Found");
        setinitPrice('');
      });
  }
  const getPercentageChange = async() => {
    var percDiff = await ( ( parseInt(initPrice) - parseInt(todayPrice)) / ( parseInt(initPrice) ) );
    console.log("Per Dif"+percDiff)
  }

  const handleSubmit = () => {
    todaysDate()
    console.log(curr+date+amount)
    //Get The Price when initially bought
    getInitPrice()
    //Get The Price Today
    getTodayPrice()
    //Get PErcentage Change
    getPercentageChange()
    //Apply Percentage Change to Initial Amount
    //Display in right side box element
  }
  const dateConvertToApi = () => {
    const input = date
    const [year, month, day] =  input.split('-')
    return (day+"-"+month+"-"+year)
  }
    //This function will return todays Date to use as the max in the date field
  const todaysDate = () =>{
    let today = new Date();
    return (today.getFullYear()+"-"+today.toLocaleString("en-US", { month: '2-digit' })+"-"+today.toLocaleString("en-US", { day : '2-digit'}))
  }

  return (
    <Box>
      <div>Calculate Crypto Gains/Losses</div>
    <Box sx={{
      width: '50%',
      height: '10%',
      backgroundColor: 'silver',
      borderColor: 'pink',
    }}>
      <form>
        <FormGroup
          sx={{
            padding: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "primary.main",
          }}
        >
          <FormLabel component="legend">Initial "Investment"</FormLabel>
          <TextField
            sx={{ paddingBottom: 2 }}
            type="number"
            name="initValue"
            variant="outlined"
            placeholder="$100"
            value={amount}
            InputProps={{ inputProps: { min: 0, max: 1000000000 } }}
            onChange={(prop: any) => {
              setAm(prop.target.value);
            }}
            required
          />
          <FormLabel component="legend">Select Currency</FormLabel>
          <FormControl>
            <FormLabel id="currency">Crypto Currencies</FormLabel>
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
    </Box>
  );
}

export default App;
