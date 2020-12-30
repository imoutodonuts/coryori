import { getTheme } from '@fluentui/react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const { palette } = getTheme()

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  background-color: white;
  border-bottom: 1px solid #cfcfcf;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  max-width: var(--max-width);
  padding: 0 1rem;
`

export const Logo = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 1.5rem;
  vertical-align: middle;
`

export const Nav = styled.nav`
  display: flex;

  a[href='${(props: { pathname: string }) => props.pathname}'] {
    border-bottom: 1px solid ${palette.neutralPrimary};
  }
`

export const List = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style-type: none;
`

export const Item = styled.li`
  display: inline-block;
  margin: 1rem 1rem 1rem 0;
`

export const Menu = styled.div`
  display: flex;
  margin-left: auto;

  * + * {
    margin-left: 1rem;
  }
`

export const StyledLink = styled(Link)`
  color: ${palette.neutralPrimary};
  text-decoration: none;

  :hover {
    border-bottom: 1px solid ${palette.neutralPrimary};
  }
`
