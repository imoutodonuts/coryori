import { getTheme, ITextFieldStyles } from '@fluentui/react'
import { DeepPartial } from '@uifabric/merge-styles'
import styled from 'styled-components'

const { palette } = getTheme()

export const StepContainer = styled.div`
  .step-actions {
    visibility: hidden;
  }

  :hover {
    .step-actions {
      visibility: visible;
    }
  }
`

export const stepInputStyles: DeepPartial<ITextFieldStyles> = {
  root: {
    marginBottom: '0.5rem',
  },
  fieldGroup: {
    minHeight: '5rem',
  },
  field: {
    padding: '0.5rem',
    border: '1px solid var(--light-gray)',
    borderRadius: '2px',
    '&:focus': { borderColor: palette.accent },
  },
}
