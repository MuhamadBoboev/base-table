import { ThemeOptions } from '@mui/material'

import { palette } from '../palette'

export const buttonsTheme: ThemeOptions['components'] = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        textTransform: 'none',
        borderRadius: 48,
        color: 'white',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
    defaultProps: {
      variant: 'contained',
    },
    variants: [
      {
        props: {
          size: 'small',
        },
        style: {
          fontSize: 16,
          fontWeight: 700,
          lineHeight: 1.25,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 8,
        },
      },
      {
        props: {
          size: 'medium',
        },
        style: {
          fontSize: 20,
          fontWeight: 500,
          lineHeight: 1.16,
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 16,  
          paddingRight: 16,
          borderRadius: 10,
        },
      },
      {
        props: {
          size: 'large',
        },
        style: {
          fontSize: 24,
          fontWeight: 700,
          lineHeight: 1.16,
          paddingTop: 24,
          paddingBottom: 24,
          paddingLeft: 32,
          paddingRight: 32,
          borderRadius: 12,
        },
      }
    ],
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        backgroundColor: '#F5F7FA',
        borderRadius: 10,
        '&:hover svg': {
          stroke: palette.primary.main,
        },
      },
    },
    variants: [
      {
        props: {
          size: 'large',
        },
        style: {
          padding: '12px 16px',
        },
      },
      {
        props: {
          size: 'medium',
        },
        style: {
          padding: 12,
        },
      },
      {
        props: {
          size: 'small',
        },
        style: {
          width: 32,
          height: 32,
        },
      }
    ],
  },
  // Remove the MuiLoadingButton property
  MuiLink: {
    styleOverrides: {
      root: {
        color: `${palette.text.primary} !important`,
        textDecoration: 'none',
        '&:hover': {
          color: `${palette.primary.main} !important`,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        height: '100%',
        maxWidth: '100% !important',
      },
    },
  },
  MuiCardMedia: {
    styleOverrides: {
      root: {
        padding: '10px',
        objectFit: 'contain',
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: '12px 16px', 
        borderTop: `1px solid ${palette.grey[500]}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        boxSizing: 'border-box',
      },
    },
  },
}
