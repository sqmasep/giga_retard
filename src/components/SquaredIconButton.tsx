import { IconButton, styled } from "@mui/material";

const SquaredIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 2 * theme.shape.borderRadius,
  border: "2px solid #eee",
}));

SquaredIconButton.defaultProps = {
  centerRipple: false,
};

export default SquaredIconButton;
