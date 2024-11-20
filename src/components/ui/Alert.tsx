import Icon from "./Icon/Icon";

type AlertProps = {
  message: string;
};

export default function Alert({ message }: AlertProps) {
  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center gap-1.5 p-4 md:p-5 lg:p-7 bg-accent-overlay border-2 border-accent-dark shadow-sm rounded-lg text-gray-100 text-center text-md lg:text-lg lg:flex-row lg:max-w-fit">
      <Icon icon="warning-circle" color="var(--gray-100)" size="2em" />
      <p>{message}</p>
    </div>
  );
}
