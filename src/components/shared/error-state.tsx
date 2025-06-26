import { AlertCircleIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-4">
      <div className="bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm">
        <div className="flex items-center justify-center rounded-lg bg-red-100 p-3">
          <AlertCircleIcon className="size-6 text-red-500" />
        </div>
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
