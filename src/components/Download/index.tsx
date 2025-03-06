import { createMessage, Messages } from "../../constants/messages";
import { DownloadProps } from "./types";

const Download = ({ onClick, ...props }: DownloadProps) => {
  return <button onClick={onClick} {...props}>{createMessage(Messages.download)}</button>;
};

export { Download };
