import { fileUpload } from "../../helpers/api-communicators";
import { useChatState } from "../../context/ChatStateContext";

type Props = {
  bg: string;
  text: string;
  textColor: string;
};

const FileUploader = (props: Props) => {
  const chatState = useChatState();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      fileUpload(e.target.files[0])
        .then(() => chatState?.startRag())
        .catch((err) => {
          console.log(err);
        });
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
