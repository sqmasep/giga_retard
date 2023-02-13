import { useState } from "react";

const useToggle = (initial: boolean = false) => {
  const [state, setState] = useState(initial);
  const toggle = (force?: boolean) => setState(prev => force || !prev);

  return [state, toggle] as const;
};

export default useToggle;
