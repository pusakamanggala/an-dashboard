import ImagesTable from "../components/ImagesTable";
import usePageTitle from "../hooks/usePageTitle";

const Images = () => {
  const pageTitle = usePageTitle();

  //   images dummy data
  const imagesData = [
    {
      projectName: "Manual Book",
      repository: "dockerdong",
      namespace: "budi-project",
      imagesOwner: "imbron Cos",
      createdAt: "2021-08-01 12:00:00",
    },
    {
      projectName: "User Manual",
      repository: "dockerdong",
      namespace: "budi-project",
      imagesOwner: "imbron Cos",
      createdAt: "2021-08-01 12:00:00",
    },
    {
      projectName: "My Awesome App",
      repository: "dockerdong",
      namespace: "budi-project",
      imagesOwner: "imbron Cos",
      createdAt: "2021-08-01 12:00:00",
    },
    {
      projectName: "Cool Project",
      repository: "dockerdong",
      namespace: "budi-project",
      imagesOwner: "imbron Cos",
      createdAt: "2021-08-01 12:00:00",
    },
  ];

  return (
    <section className="space-y-5 w-full">
      <h1 className="font-semibold text-sky-700 text-2xl">{pageTitle}</h1>
      <ImagesTable images={imagesData} />
    </section>
  );
};

export default Images;
