import React from "react";
import MultiActionAreaCard from "./SingleCard";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, CardActionArea, CardActions } from "@mui/material";
const Country = () => {
  const [Population, setPopulation] = React.useState("");
  const [offset, setOffset] = React.useState(0);
  const [countryData, SetCountryData] = React.useState([]);
  const [filterData, SetFilterData] = React.useState([]);
  const [Region, setRegion] = React.useState("");
  const getAllData = () => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((res) => SetCountryData(res))
      .catch((err) => console.log(err));
  };
  const handleChange = (event) => {
    setPopulation(event.target.value);
    const curr2 = event.target.value;
    if (filterData.length > 0) {
      if (curr2 === "Ascending") {
        filterData.sort((a, b) => {
          return a.population - b.population;
        });
      } else {
        filterData.sort((a, b) => {
          return b.population - a.population;
        });
      }
    } else {
      if (curr2 === "Ascending") {
        countryData.sort((a, b) => {
          return a.population - b.population;
        });
      } else {
        countryData.sort((a, b) => {
          return b.population - a.population;
        });
      }
    }
  };
  const handleChangeFilter = (e) => {
    setRegion(e.target.value);
    const curr = e.target.value;

    const data = countryData.filter((country) => {
      if (curr === "All") {
        return true;
      } else {
        return country.region === curr;
      }
    });
    SetFilterData(data);
  };
  React.useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <Box sx={{ minWidth: 100 }} margin={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Sort According To Population
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Population}
            label="Sort According To Population"
            onChange={handleChange}
          >
            <MenuItem value={"Ascending"}>Ascending</MenuItem>
            <MenuItem value={"Descending"}>Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 100 }} margin={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Filter By Region
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Region}
            label="Filter By Region"
            onChange={handleChangeFilter}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Asia"}>Asia</MenuItem>
            <MenuItem value={"Europe"}>Europe</MenuItem>
            <MenuItem value={"Americas"}>Americas</MenuItem>
            <MenuItem value={"Africa"}>Africa</MenuItem>
            <MenuItem value={"Antarctic"}>Antarctic</MenuItem>
            <MenuItem value={"Oceania"}>Oceania</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className="GridLayout">
        {filterData.length > 0
          ? filterData.map((el, index) => {
              if (index >= offset && index < offset + 16) {
                return <MultiActionAreaCard el={el} key={index} />;
              }
              return false;
            })
          : countryData.map((el, index) => {
              if (index >= offset && index < offset + 16) {
                return <MultiActionAreaCard el={el} key={index} />;
              }
              return false;
            })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button
          variant="contained"
          onClick={() => setOffset(offset - 16)}
          disabled={offset === 0}
        >
          Prev
        </Button>
        <Button
          variant="contained"
          onClick={() => setOffset(offset + 16)}
          disabled={
            filterData.length > 0
              ? offset >= filterData.length - 16
              : offset >= countryData.length - 16
          }
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Country;
