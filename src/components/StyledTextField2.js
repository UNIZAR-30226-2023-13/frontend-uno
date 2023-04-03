import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTextField2 = styled(TextField)`
  width: 700px;
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