import React from "react";
import { AnimatePresence } from "framer-motion";
import { List, styled } from "@mui/material";

interface DropdownProps {
  children: React.ReactNode;
  open: boolean;
}

const StyledList = styled(List)(({ theme }) => ({
  outline: theme.styling.outline,
  borderRadius: ".25em",
  boxShadow: theme.styling.shadow,
}));

const Dropdown = React.forwardRef<
  HTMLUListElement,
  DropdownProps & React.ComponentProps<typeof StyledList>
>(({ children, open, ...props }, ref) => {
  return (
    <AnimatePresence>
      {open && (
        <StyledList ref={ref} {...props}>
          {children}
        </StyledList>
      )}
    </AnimatePresence>
  );
});

export default Dropdown;
