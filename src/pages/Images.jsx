import ImagesTable from "../components/ImagesTable";
import usePageTitle from "../hooks/usePageTitle";
import { useGetImages } from "../hooks/useGetImages";
import TableSkeleton from "../components/TableSkeleton";

const Images = () => {
  const pageTitle = usePageTitle();
  const {
    data: imagesData,
    isLoading: imagesIsLoading,
    isSuccess: imagesIsSuccess,
    isError: imagesIsError,
    error: imagesError,
  } = useGetImages();

  return (
    <section className="space-y-5 w-full">
      <h1 className="font-semibold text-sky-700 text-2xl">{pageTitle}</h1>
      {imagesIsLoading && <TableSkeleton numRows={5} numColumns={4} />}
      {imagesIsError && (
        <p className="font-semibold text-center text-red-600">
          {imagesError?.response?.data?.message || "Something went wrong"}
        </p>
      )}
      {imagesIsSuccess && <ImagesTable images={imagesData.data.projects} />}
    </section>
  );
};

export default Images;
