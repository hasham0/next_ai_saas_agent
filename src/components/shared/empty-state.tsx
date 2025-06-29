import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image?: string;
};

const EmptyState = ({
  title,
  description,
  image = "/assets/empty.svg",
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={image} width={200} height={200} alt={"empty"} />
      <div className="mx-auto flex max-w-md flex-col gap-y-3 text-center md:gap-y-6">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
