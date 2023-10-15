import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useNotification = () => {
  const showToast = (message, type, options = {}) => {
    // Dismiss any open toast before showing a new one
    toast.dismiss();

    const isMobile = window.innerWidth <= 767;
    const defaultOptions = {
      position: isMobile ? "top-right" : "bottom-right",
      className: "toast-custom",
      theme: "colored",
    };

    const toastOptions = { ...defaultOptions, ...options };

    if (type === "success") {
      toast.success(message, toastOptions, { autoClose: 2000 });
    } else if (type === "error") {
      toast.error(message, toastOptions);
    } else if (type === "loading") {
      toast.loading(message, { ...toastOptions, autoClose: false });
    } else if (type === "warning") {
      toast.warning(message, toastOptions);
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
