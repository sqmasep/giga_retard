import { Toggle } from "@/hooks/useToggle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import React from "react";

interface ConfirmProps {
  open: boolean;
  toggle: Toggle;
  title?: string;
  description?: string;
  onConfirm: () => void;
  closeAfterConfirm?: boolean;
}

const Confirm: React.FC<ConfirmProps> = ({
  open,
  toggle,
  title,
  description,
  onConfirm,
  closeAfterConfirm = true,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack direction='row' gap={2}>
          <Button variant='outlined' onClick={() => toggle(false)}>
            Non! Annule!
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              onConfirm();
              closeAfterConfirm && toggle(false);
            }}
          >
            Je confirme!
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
