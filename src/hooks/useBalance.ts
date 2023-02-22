import useToggle from "./useToggle";

interface BalanceArgs<T> {
  initialA: boolean;
  initialB: boolean;
  action: (a: T) => void;
}

const useBalance = <const T, const R>(A: T, B: R) => {
  return ({ initialA, initialB, action }: BalanceArgs<T | R | null>) => {
    const [a, toggleA] = useToggle(initialA);
    const [b, toggleB] = useToggle(initialB);

    const balance = (condition: T | R) => {
      if (condition === A) {
        action((!a && condition) || null);
        toggleA();
        toggleB(false);
        return;
      }
      action((!b && condition) || null);
      toggleA(false);
      toggleB();
    };
    return [a, b, balance] as const;
  };
};

export default useBalance;
