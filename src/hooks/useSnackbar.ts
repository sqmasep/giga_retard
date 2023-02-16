import { useState } from "react";

const useSnackbar = () => {
  const [state, setSnackbar] = useState({ open: false, message: "" });

  const setMessage = (message: string) => setSnackbar({ open: true, message });
  const close = () => setSnackbar({ open: false, message: "" });

  return {
    open: state.open,
    message: state.message,
    close,
    setMessage,
  };
};

export default useSnackbar;
