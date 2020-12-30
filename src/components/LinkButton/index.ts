import { getTheme } from '@fluentui/react'
import styled from 'styled-components'

const { palette } = getTheme()

const LinkButton = styled.button`
  padding: 0;
  color: ${palette.neutralPrimary};
  font-size: inherit;
  font-family: inherit;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  border-radius: 0;
  outline: none;
  cursor: pointer;

  :hover {
    border-bottom: 1px solid ${palette.neutralPrimary};
  }
`

export default LinkButton
