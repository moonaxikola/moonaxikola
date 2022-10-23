const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const success = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
};

const warning = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
};

const error = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
};

const primary = {
  main: '#024EFF',
  contrastText: '#fff',
};

const secondary = {
  main: '#C2E812',
  contrastText: '#000',
};

export const palette = {
  light: {
    mode: 'light',
    primary,
    secondary,
    success,
    warning,
    error,
    grey,
  },
  dark: {
    mode: 'dark',
    primary,
    secondary,
    success,
    warning,
    error,
    grey,
  },
} as const;
