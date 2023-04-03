import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField)`
  width: 400px;
  & .MuiFormLabel-root {
    color: white;
  }
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
  & .MuiInputBase-input {
    color: white;
  }
  & .MuiOutlinedInput-notchedOutline{
    border-color: white !important;
  }
  & ::placeholder{
    color: white;
  }
  */
  & .MuiOutlinedInput-root{
    border-radius: 50px;
  }
  */
`