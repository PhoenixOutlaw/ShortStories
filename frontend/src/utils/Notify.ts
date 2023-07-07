import { toast } from "react-toastify";

const notify = {
  success: (text: string) => toast(text, { type: "success" }),
  error: (text: string) => toast(text, { type: "error" }),
  info: (text: string) => toast(text, { type: "info" }),
  warning: (text: string) => toast(text, { type: "warning" }),
};
export default notify;
