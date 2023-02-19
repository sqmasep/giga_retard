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

const Dropdown: React.FC<
  DropdownProps & React.ComponentProps<typeof StyledList>
> = ({ children, open, ...props }) => {
  return (
    <AnimatePresence>
      {open && <StyledList {...props}>{children}</StyledList>}
    </AnimatePresence>
  );
};

export default Dropdown;