import { getTheme, IButtonStyles, ITextFieldStyles } from '@fluentui/react'
import { DeepPartial } from '@uifabric/merge-styles'
import styled from 'styled-components'

const { palette } = getTheme()

export const Table = styled.table`
  margin: 0.5rem 0;
`

export const IngredientContainer = styled.tr`
  .ingredient-actions {
    visibility: hidden;
  }

  :hover {
    .ingredient-actions {
      visibility: visible;
    }
  }
`

export const itemInputStyles: DeepPartial<ITextFieldStyles> = {
  fieldGroup: {
    maxWidth: '10rem',
  },
}

export const servingsInputStyles: DeepPartial<ITextFieldStyles> = {
  fieldGroup: {
    maxWidth: '3em',
  },
  field: {
    padding: '0.5rem',
    border: '1px solid var(--light-gray)',
    borderRadius: '2px',
    '&:focus': { borderColor: palette.accent },
  },
}

export const addSubButtonStyles: IButtonStyles = {
  root: { '&&': { margin: '0 0.5rem' } },
  icon: {
    '&&': {
      fontSize: '0.875rem',
      fontWeight: 'bold',
    },
  },
}
