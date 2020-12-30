import { getTheme, IButtonStyles, ITextFieldStyles } from '@fluentui/react'
import { DeepPartial } from '@uifabric/merge-styles'
import styled from 'styled-components'

const { palette } = getTheme()

export const StyledAuth = styled.div`
  padding: 2rem;
`

export const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.75rem;
`

export const textFieldStyles: DeepPartial<ITextFieldStyles> = {
  root: {
    marginBottom: '0.75rem',
  },
  fieldGroup: {
    height: '3rem',
  },
  field: {
    borderBottom: '1px solid var(--light-gray)',
    '&:focus': { borderColor: palette.accent },
  },
  errorMessage: {
    padding: '0 8px',
  },
}

export const buttonStyles: IButtonStyles = {
  root: { marginLeft: 'auto', '&&': { marginTop: '1.125rem' } },
  label: { fontWeight: 400 },
}
