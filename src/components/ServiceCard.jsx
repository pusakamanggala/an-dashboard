import BoxIcon from "../icons/box-blue.svg";
import UserIcon from "../icons/user-blue.svg";
import GitlabIcon from "../icons/gitlab-blue.svg";
import HealthIcon from "../icons/health-blue.svg";
import DocumentIcon from "../icons/document-blue.svg";
import LinkICon from "../icons/link-blue.svg";
import { getBadgeColor } from "../utils/helper";
import PropTypes from "prop-types";

const ServiceCard = ({ serviceData }) => {
  return (
    <div className="p-5 shadow-[0_3px_10px_0_rgba(0,0,0,0.25)] rounded-lg space-y-4 font-medium">
      <div className="flex gap-2 items-center">
        <img
          className="w-5 h-5"
          src={BoxIcon}
          alt="service_name_icon"
          title="service name"
        />
        <p className="line-clamp-1">{serviceData.serviceName}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img
          className="w-5 h-5"
          src={UserIcon}
          alt="project_owner_icon"
          title="project owner"
        />
        <p className="line-clamp-1">{serviceData.projectOwner}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img
          className="w-5 h-5"
          src={GitlabIcon}
          alt="images_icon"
          title="images"
        />
        <p className="line-clamp-1  hover:line-clamp-none">
          {serviceData.images}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <img
          className="w-5 h-5"
          src={HealthIcon}
          alt="status_icon"
          title="pod status"
        />
        <p
          className={`line-clamp-1 ${getBadgeColor(
            serviceData.podStatus
          )} px-2 py-1 capitalize rounded-md`}
        >
          {serviceData.podStatus}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <img
          className="w-5 h-5"
          src={DocumentIcon}
          alt="namespace_icon"
          title="namespace"
        />
        <p className="line-clamp-1">{serviceData.namespace}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img
          className="w-5 h-5"
          src={LinkICon}
          alt="namespace_icon"
          title="ingress host"
        />
        <p className="line-clamp-2 text-sm  hover:line-clamp-none">
          {serviceData.ingressHost}
        </p>
      </div>
      <div className="flex justify-center">
        <a
          className="bg-sky-600 hover:bg-sky-800 transition-colors duration-300 text-white px-4 py-2 rounded-md"
          href={`https://${serviceData.ingressHost}`}
          target="_blank"
          rel="noreferrer"
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
