import toast from "react-hot-toast";
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
      toast.loading("Uploading file", { id: "upload" });
      fileUpload(e.target.files[0])
        .then(() => {
          toast.success("File uploaded successfully", { id: "upload" });
          chatState?.startRag();
          e.target.value = "";
        })
        .catch((err) => {
          toast.error("File upload failed", { id: "upload" });
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
