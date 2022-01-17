import { toast } from "react-toastify";
import { IRootStore } from "./root";

export interface IError {
  message: string;
  code: number;
}

export const handleStoreError = (
  err: any,
  { id, show = true, store }: { id: string; show?: boolean; store: IRootStore }
) => {
  let { message } = err;

  if (err.code === 401) {
    // todo add logout method here
  }

  if (err.code === 403) {
    // todo add logout method here
  }

  if (err.code === 408) {
    message = "Sorry, there seems to be a problem with the connection";
  }

  if (show) {
    toast.error(message, { toastId: id });
  }
};
