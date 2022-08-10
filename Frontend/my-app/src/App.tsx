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



function App() {
  const [curr, setCurr] = React.useState('bitcoin');
  const [date, setDate] = React.useState('');
  const [amount, setAm] = React.useState('');


  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurr((event.target as HTMLInputElement).value);
  };

  const handleSubmit = () => {
    todaysDate()
    
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
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="Crypto"
              value={curr}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="bitcoin" control={<Radio />} label="Bitcoin" />
              <FormControlLabel value="etherium" control={<Radio />} label="Ethereum" />
            </RadioGroup>
          </FormControl>

          <Typography component="legend">Date Of Investment</Typography>
          <TextField
            autoFocus
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
