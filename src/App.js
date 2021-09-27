import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Table from "./components/Table";
import { sortData } from "./components/util";
import LineGraph from "./components/LineGraph";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const country = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setCountries(country);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);

  let count = 0;

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
    setCountry(countryCode);
  };
  // console.log(tableData);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={count++} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            className="infoBos"
            title="Corona cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          ></InfoBox>
          <InfoBox
            className="infoBox"
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          <InfoBox
            className="infoBox"
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>
        <LineGraph
          cases={countryInfo.todayCases}
          deaths={countryInfo.todayDeaths}
          recovered={countryInfo.todayRecovered}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
