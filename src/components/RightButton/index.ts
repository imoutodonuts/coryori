import { getTheme, IconButton } from '@fluentui/react'
import styled from 'styled-components'

const { palette } = getTheme()

const RightButton = styled(IconButton)`
  position: absolute;
  right: 0;
  color: ${palette.neutralPrimary};

  :hover {
    color: ${palette.neutralPrimary};
  }
`

export default RightButton
