import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useNotification = () => {
  const showToast = (message, type, options = {}) => {
    const isMobile = window.innerWidth <= 767;
    const defaultOptions = {
      position: isMobile ? "top-right" : "bottom-right",
      className: "toast-custom",
      theme: "colored",
    };

    const toastOptions = { ...defaultOptions, ...options };

    // Dismiss any existing toast
    toast.dismiss();

    if (type === "success") {
      toast.success(message, { ...toastOptions, autoClose: false });
    } else if (type === "error") {
      toast.error(message, { ...toastOptions, autoClose: false });
    } else if (type === "loading") {
      // Do not dismiss the loading toast
      toast.loading(message, {
        ...toastOptions,
        autoClose: false,
        style: {
          background: "#0369a1",
          color: "#fff",
        },
      });
    } else if (type === "warning") {
      toast.warning(message, { ...toastOptions, autoClose: false });
    }
  };

  const notifyLoading = (message) => {
    showToast(message, "loading");
  };

  const notifySuccess = (message) => {
    showToast(message, "success");
  };

  const notifyError = (message) => {
    showToast(message, "error");
  };

  const notifyWarning = (message) => {
    showToast(message, "warning");
  };

  return { notifyLoading, notifySuccess, notifyError, notifyWarning };
};

export default useNotification;
