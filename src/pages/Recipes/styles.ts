import { getTheme } from '@fluentui/react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const { palette } = getTheme()

interface CoverProps {
  image: string
  position: string
}

export const Cover = styled.div`
  width: 11rem;
  height: 15rem;
  margin-bottom: 0.5rem;
  background-image: ${({ image }: CoverProps) => `url(${image})`};
  background-position: ${({ position }: CoverProps) => position};
  border-radius: 0.75rem;
  transition: transform 0.25s ease-out;

  :hover {
    transform: scale(1.1);
  }
`

export const StyledLink = styled(Link)`
  width: fit-content;
  color: ${palette.neutralPrimary};
  text-decoration: none;
  border-bottom: 1px solid transparent;

  :hover {
    border-bottom: 1px solid ${palette.neutralPrimary};
  }
`

export const Title = styled.div`
  overflow: hidden;
  font-size: 1.125rem;
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;
`

export const Author = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;
`
