import { useLocation } from "react-router-dom";

// Custom hook to determine the page title
const usePageTitle = () => {
  const location = useLocation();

  switch (location.pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/deploy":
      return "Deployment";
    case "/images":
      return "Images";
    case "/service":
      return "Service";
    case "/addons":
      return "Addons Service";
    case "/members":
      return "User Members";
    case "/kube-config":
      return "Kube Config";
    case "/gitlab-config":
      return "Gitlab Config";
    default:
      return "Page title not found";
  }
};

export default usePageTitle;
