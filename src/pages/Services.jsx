import React from "react";
import ServiceCard from "../components/ServiceCard";
import usePageTitle from "../hooks/usePageTitle";
import { useGetServices } from "../hooks/useGetServices";

const Services = () => {
  const {
    data: servicesData,
    isLoading: servicesIsLoading,
    isSuccess: servicesIsSuccess,
    isError: servicesIsError,
    error: servicesError,
  } = useGetServices();

  const cardLoadingSkeleton = () => {
    return (
      <div className="p-5 shadow-[0_3px_10px_0_rgba(0,0,0,0.25)] rounded-lg space-y-4 font-medium">
        <div className="animate-pulse flex gap-2 items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-24 rounded-md"></div>
        </div>
        <div className="animate-pulse flex gap-2 items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-36 rounded-md"></div>
        </div>
        <div className="animate-pulse flex gap-2 items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-48 rounded-md"></div>
        </div>
        <div className="animate-pulse flex gap-2 items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-24 rounded-md"></div>
        </div>
        <div className="animate-pulse flex gap-2 items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-20 rounded-md"></div>
        </div>
        <div className="animate-pulse flex gap-2 items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-56 rounded-md"></div>
        </div>
        <div className="animate-pulse flex justify-center">
          <div className="bg-gray-300 h-10 w-32 rounded-md"></div>
        </div>
      </div>
    );
  };

  const pageTitle = usePageTitle();
  return (
    <section className="space-y-5 w-full">
      <h1 className="font-semibold text-sky-700 text-2xl">{pageTitle}</h1>
      {servicesIsError && (
        <p className="font-semibold text-center text-red-600">
          {servicesError?.response?.data?.message || "Something went wrong"}
        </p>
      )}
      {servicesIsSuccess && servicesData.data.length === 0 && (
        <p>{servicesData.message}</p>
      )}
      {servicesIsSuccess && servicesData.data.length > 0 && (
        <section className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 px-5">
          {servicesData.data.map((service, index) => (
            <React.Fragment key={index}>
              <ServiceCard serviceData={service} />
            </React.Fragment>
          ))}
        </section>
      )}
      {servicesIsLoading && (
        <section className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 px-5">
          {Array(2)
            .fill()
            .map(() => cardLoadingSkeleton())}

          {cardLoadingSkeleton()}
        </section>
      )}
    </section>
  );
};

export default Services;
