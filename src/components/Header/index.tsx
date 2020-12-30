import { Spinner } from '@fluentui/react'
import { useBoolean } from '@uifabric/react-hooks'
import { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Database, Recipe } from '../../api'
import { SyncStatus } from '../../App'
import Auth, { AuthType } from '../Auth'
import LinkButton from '../LinkButton'
import {
  HeaderContainer,
  Item,
  List,
  Logo,
  Menu,
  Nav,
  StyledHeader,
  StyledLink,
} from './styles'

interface Props {
  syncStatus: SyncStatus | undefined
  setSyncStatus: (syncStatus: SyncStatus) => void
  username: string | undefined
  setUsername: (username: this['username']) => void
}

const Header = ({
  syncStatus,
  setSyncStatus,
  username,
  setUsername,
}: Props) => {
  const [modalType, setModalType] = useState<AuthType>('signIn')
  const location = useLocation()
  const history = useHistory()
  const [
    isAuthModalOpen,
    { setTrue: showAuthModal, setFalse: hideAuthModal },
  ] = useBoolean(false)

  const signOut = () => {
    setUsername(undefined)
    Database.putConfig({ username: undefined })
    history.push('/')
  }

  const handleAuthModal = (type: 'signIn' | 'signUp') => {
    setModalType(type)
    showAuthModal()
  }

  const handleRandomButton = async () => {
    const recipe = await Recipe.random()
    history.push(`/recipes/${recipe.author}/${recipe.title}`)
  }

  return (
    <StyledHeader>
      <HeaderContainer>
        <Link to="/">
          <Logo alt="logo" src="/logo.svg" />
        </Link>
        <Nav pathname={location.pathname}>
          <List>
            <Item>
              <StyledLink to="/recipes">食谱</StyledLink>
            </Item>
            <Item>
              <LinkButton onClick={handleRandomButton}>随机</LinkButton>
            </Item>
          </List>
        </Nav>
        {syncStatus === 'syncing' && (
          <Spinner label="正在同步" labelPosition="right" />
        )}
        {username === undefined ? (
          <Menu>
            <LinkButton onClick={() => handleAuthModal('signIn')}>
              登录
            </LinkButton>
            <LinkButton onClick={() => handleAuthModal('signUp')}>
              注册
            </LinkButton>
          </Menu>
        ) : (
          <Menu>
            <StyledLink to="/upload">上传</StyledLink>
            <LinkButton onClick={signOut}>退出</LinkButton>
          </Menu>
        )}
        {isAuthModalOpen && (
          <Auth
            type={modalType}
            hideModal={hideAuthModal}
            setSyncStatus={setSyncStatus}
            setUsername={setUsername}
          />
        )}
      </HeaderContainer>
    </StyledHeader>
  )
}

export default Header
