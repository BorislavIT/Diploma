import { ProgressSpinner } from "primereact/progressspinner";

const LargeLoader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <ProgressSpinner strokeWidth="2" />
    </div>
  );
};

export default LargeLoader;
