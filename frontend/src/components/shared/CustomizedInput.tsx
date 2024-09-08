import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "#69827c" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      size="small"
      InputProps={{
        style: {
          width: "300px",
          borderRadius: 10,
          background: "white",
        },
      }}
    />
  );
};

export default CustomizedInput;
