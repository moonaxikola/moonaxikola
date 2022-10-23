import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

export const Root = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  minHeight: '100%',
}));

export const DescriptionContainer = styled('div')(({ theme }) => ({
  flex: 2,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,

  '&::after': {
    content: "''",
    background: "center / cover no-repeat url('/img/background/abs-1.png')",
    opacity: 0.4,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
  },

  '& > div': {
    zIndex: 2,
  },

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const FormContainer = styled('div')(({ theme }) => ({
  flexShrink: 0,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),

  '& > div': {
    width: 340,
  },
}));
