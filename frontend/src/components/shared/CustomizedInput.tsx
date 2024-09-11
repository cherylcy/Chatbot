import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="dense"
      InputLabelProps={{ style: { color: "#69827c" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      size="small"
      InputProps={{
        style: {
          width: "300px",
          borderRadius: 10,
          background: "#faf9f7",
        },
      }}
    />
  );
};

export default CustomizedInput;
