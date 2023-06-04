import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 44,
  minHeight: "44px !important",
  [theme.breakpoints.up('sm')]: {
    height: 50,
  },
}));

export default Toolbar;