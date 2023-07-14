import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useEffect } from "react";

const filter = createFilterOptions();

export default function CustomAutoComplete({
  handleCallBack,
  label,
  data,
  field,
  disabled,
  defaultValue,
  customOption,
  clearInput,
}) {
  const [value, setValue] = React.useState(null);

  useEffect(() => {
    if (value) {
      handleCallBack({ ...value, field });
    }
  }, [value]);

  useEffect(() => {
    if (!value) {
      setValue(defaultValue?.length > 0 ? defaultValue[0] : "");
    }
  }, [value, defaultValue]);

  return (
    <Autocomplete
      value={value}
      disabled={disabled}
      defaultValue={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue && customOption) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting && customOption) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={data}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      //   sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
