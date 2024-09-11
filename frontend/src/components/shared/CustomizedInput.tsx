import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
  required?: boolean;
};
const CustomizedInput = ({ name, label, type, required = false }: Props) => {
  return (
    <TextField
      margin="dense"
      InputLabelProps={{ style: { color: "#69827c" } }}
      name={name}
      label={label}
      type={type}
      size="small"
      InputProps={{
        style: {
          width: "300px",
          borderRadius: 10,
          background: "#faf9f7",
        },
      }}
      required={required}
    />
  );
};

export default CustomizedInput;
