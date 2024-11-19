import { fileUpload } from "../../helpers/api-communicators";

type Props = {
  bg: string;
  text: string;
  textColor: string;
};

const FileUploader = (props: Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      fileUpload(e.target.files[0]);
    }
  };

  return (
    <label
      className="input-group"
      style={{ background: props.bg, color: props.textColor }}
    >
      <input id="file" type="file" onChange={handleFileChange} />
      {props.text}
    </label>
  );
};

export default FileUploader;
