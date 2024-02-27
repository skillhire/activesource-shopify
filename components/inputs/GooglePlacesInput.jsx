import React, { useState } from "react";
import { Autocomplete, Box, TextField, InputAdornment } from "@mui/material";
import { useGooglePlaces } from "hooks";
import Image from "next/image";

import SearchIcon from "assets/search-icon.svg";

const GooglePlacesInput = (props) => {
  const { handleClick } = props || {};

  const [keywords, setKeywords] = useState("");

  const { loading, error, place, fetchPlace, predictions, fetchPredictions } =
    useGooglePlaces();

  const handleChange = (ev) => {
    let { value } = ev.target;
    setKeywords(value);
    handleSearch(value);
  };

  const handleSearch = async (input) => {
    let resp = await fetchPredictions(input);
  };

  const handleInputChange = async (ev, value) => {
    if (value === null) return;
    let resp = await fetchPlace(value?.place_id);
    handleClick(resp);
  };

  return (
    <Box sx={sx.textInput}>
      <Autocomplete
        id="google-places-autocomplete"
        freeSolo
        options={predictions || [{ description: "No results found" }]}
        getOptionLabel={(option) => option?.description}
        sx={sx.autocomplete}
        onChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            onChange={handleChange}
            variant="standard"
            placeholder="ENTER LOCATION OR ADDRESS"
            color="secondary"
            sx={sx.textField}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <InputAdornment position="end">
                    <Image src={SearchIcon} height={32} width={32} />
                  </InputAdornment>
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};
export default GooglePlacesInput;

const sx = {
  autocomplete: {
    width: "100%",
  },
  textInput: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    wrap: "no-wrap",
  },
  textField: {
    width: "100%",
    border: "none",
    "& .MuiInputBase-root": {
      border: "none",
      fontSize: "20px",
      fontWeight: 400,
    },
  },
};
