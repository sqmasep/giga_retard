import { useState } from "react";

export type Toggle = (force?: boolean) => void;

const useToggle = (initial: boolean = false) => {
  const [state, setState] = useState(initial);
  const toggle: Toggle = force => setState(prev => force ?? !prev);

  return [state, toggle] as const;
};

export default useToggle;
