import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ options }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (value, name) => {
    setSelectedOption(value);
    navigate(`/all-books/${value}/${name}`);
  };

  return (
    <FormControl>
      <InputLabel id="dropdown-label">Select Option</InputLabel>
      <Select
        sx={{ width: "200px" }}
        labelId="dropdown-label"
        value={selectedOption}
        label="Select Option"
      >
        {options?.map((item) => (
          <MenuItem
            onClick={()=> handleOptionChange(item.id, item.genre)}
            name={item.genre}
            key={item.genre}
            value={item.id}
          >
            {item.genre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
