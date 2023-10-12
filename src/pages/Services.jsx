import React from "react";
import ServiceCard from "../components/ServiceCard";
import usePageTitle from "../hooks/usePageTitle";

const Services = () => {
  //service dummy data
  const servicesData = [
    {
      serviceName: "Manual Books",
      developerName: "John Doe",
      images: "pti-pratama-elf/dev-a-budi",
      status: "on-delivery",
      domain: "pti-pratama-elf/dev-a-budi",
    },
    {
      serviceName: "Service 2",
      developerName: "Jane Smith",
      images: "example-service/dev-b-jane",
      status: "on-delivery",
      domain: "example-service/dev-b-jane",
    },
    {
      serviceName: "Service 3",
      developerName: "Alice Johnson",
      images: "test-service/dev-c-alice",
      status: "failed",
      domain: "test-service/dev-c-alice",
    },
    {
      serviceName: "Service 4",
      developerName: "Bob Williams",
      images: "custom-service/dev-d-bob",
      status: "pending",
      domain: "custom-service/dev-d-bob",
    },
    {
      serviceName: "Service 5",
      developerName: "Eve Anderson",
      images: "prod-service/dev-e-eve",
      status: "complete",
      domain: "prod-service/dev-e-eve",
    },
  ];

  const pageTitle = usePageTitle();
  return (
    <section className="space-y-5 w-full">
      <h1 className="font-semibold text-sky-700 text-2xl">{pageTitle}</h1>
      <section className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 px-5">
        {servicesData.map((service, index) => (
          <React.Fragment key={index}>
            <ServiceCard serviceData={service} />
          </React.Fragment>
        ))}
      </section>
    </section>
  );
};

export default Services;
