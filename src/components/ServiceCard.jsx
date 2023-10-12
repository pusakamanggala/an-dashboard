import BoxIcon from "../icons/box-blue.svg";
import UserIcon from "../icons/user-blue.svg";
import GitlabIcon from "../icons/gitlab-blue.svg";
import HealthIcon from "../icons/health-blue.svg";
import LinkIcon from "../icons/link-blue.svg";
import PropTypes from "prop-types";

const ServiceCard = ({ serviceData }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-600";
      case "on-delivery":
        return "bg-blue-100 text-blue-600";
      case "failed":
        return "bg-red-100 text-red-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
    }
  };

  return (
    <div className="p-5 shadow-[0_3px_10px_0_rgba(0,0,0,0.25)] rounded-lg space-y-4 font-medium">
      <div className="flex gap-2 items-center">
        <img className="w-5 h-5" src={BoxIcon} alt="" />
        <p className="line-clamp-1">{serviceData.serviceName}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img className="w-5 h-5" src={UserIcon} alt="" />
        <p className="line-clamp-1">{serviceData.developerName}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img className="w-5 h-5" src={GitlabIcon} alt="" />
        <p className="line-clamp-1">{serviceData.images}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img className="w-5 h-5" src={HealthIcon} alt="" />
        <p
          className={`line-clamp-1 ${getStatusColor(
            serviceData.status
          )} px-2 py-1 capitalize rounded-md`}
        >
          {serviceData.status}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <img className="w-5 h-5" src={LinkIcon} alt="" />
        <p className="line-clamp-1">{serviceData.domain}</p>
      </div>
      <div className="flex justify-center">
        <a
          className="bg-sky-600 hover:bg-sky-800 transition-colors duration-300 text-white px-4 py-2 rounded-md"
          href="go_to_app_link"
          target="_blank"
        >
          Go to the app
        </a>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  serviceData: PropTypes.object.isRequired,
};

export default ServiceCard;
