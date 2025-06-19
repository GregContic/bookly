export const COLORS = {
  primary: '#EDAE49',
  secondary: '#FFA500',
  background: '#FFF5E9',
  text: {
    primary: '#222',
    secondary: '#666',
    light: '#888'
  },
  border: '#eee',
  white: '#fff'
};

export const GRADIENTS = {
  pinkGradient: {
    colors: ['rgba(255, 192, 203, 0.6)', 'rgba(255, 182, 193, 0.2)', 'rgba(255, 192, 203, 0.1)'],
    locations: [0, 0.5, 1]
  }
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  medium: {    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  }
};

const theme = {
  COLORS,
  GRADIENTS,
  SHADOWS
};

export default theme;
