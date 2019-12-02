export const FixedContainer = ({ as, ...props }) => {
  const ContainerName = as ?? "div";
  return <ContainerName {...props} />;
};
