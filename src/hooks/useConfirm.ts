import useToggle from "./useToggle";

const useConfirm = () => {
  const [isConfirmed, toggleConfirm] = useToggle(false);
  const confirm = () => toggleConfirm(true);

  return [isConfirmed, confirm] as const;
};

export default useConfirm;
