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
  const [perc, setPerc] = React.useState(Number);
  const [finalAmount, setfinalAmount] = React.useState(Number);
  const [posneg, setposneg] = React.useState('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurr((event.target as HTMLInputElement).value);
  };
  const getInitPrice = () => {
    //console.log(dateConvertToApi())

  }

  const getTodayPrice = () => {
    //console.log(dateConvertToApi())

  }


  const handleSubmit = () => {
    todaysDate()
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
            var percDiff = 1-((initialPrice - currentPrice) / (initialPrice));
            console.log("Per Dif" + percDiff)
            setPerc(percDiff)
            setfinalAmount( parseFloat(amount) * percDiff )
            console.log(finalAmount)
            console.log(parseFloat(amount) * percDiff)

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
    //Get The Price Today
    
    //Get PErcentage Change
    //Apply Percentage Change to Initial Amount
    //Display in right side box element
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
