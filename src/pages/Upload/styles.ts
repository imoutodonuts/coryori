import {
  getTheme,
  IButtonStyles,
  ITextFieldStyles,
  ITextStyles,
} from '@fluentui/react'
import { DeepPartial } from '@uifabric/merge-styles'

const { palette } = getTheme()

export const titleStyles: DeepPartial<ITextFieldStyles> = {
  root: {
    margin: '2rem 0',
  },
  fieldGroup: { height: 'auto' },
  field: {
    fontSize: '2rem',
    fontWeight: 500,
    borderBottom: '1px solid var(--light-gray)',
    '&:focus': { borderColor: palette.accent },
    '&::placeholder': { fontWeight: 'inherit' },
  },
}

export const errorMessageStyles: ITextStyles = {
  root: {
    color: palette.redDark,
  },
}

export const buttonStyles: IButtonStyles = {
  root: {
    marginTop: '1rem',
  },
  label: { fontWeight: 400 },
}
