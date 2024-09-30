interface IProps {
  className?: string;
}

function Skeleton({ className }: IProps) {
  return (
      <div
        className={`block antialiased tracking-normal font-sans text-5xl font-semibold leading-tight text-inherit rounded-lg bg-gray-700 ${className}`}
      >
        &nbsp;
    </div>
  );
}
export default Skeleton;
