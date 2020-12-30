import { Modal, PrimaryButton, Stack, TextField } from '@fluentui/react'
import { useState } from 'react'
import { Database, User } from '../../api'
import { SyncStatus } from '../../App'
import { isNull } from '../../utils'
import RightButton from '../RightButton'
import { buttonStyles, StyledAuth, textFieldStyles, Title } from './styles'

export type AuthType = 'signIn' | 'signUp' | 'connect'

interface FormData {
  url: string
  username: string
  password: string
}

interface Props {
  type: AuthType
  hideModal: () => void
  setSyncStatus: (syncStatus: SyncStatus) => void
  setUrl?: (url: string) => void
  setUsername?: (username: string) => void
}

const Auth = ({
  type,
  hideModal,
  setSyncStatus,
  setUrl,
  setUsername,
}: Props) => {
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [urlError, setUrlError] = useState<string>()
  const [usernameError, setUsernameError] = useState<string>()
  const [passwordError, setPasswordError] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async () => {
    const url = formData.url
    const username = formData.username
    const password = formData.password
    if (type === 'connect') {
      if (url === undefined || isNull(url)) {
        setUrlError('链接不能为空')
        return
      }
      if (url.indexOf('coryori://') === -1) {
        setUrlError('链接错误')
        return
      }
      setIsSubmitting(true)
      Database.putConfig({ url })
      setUrl?.(url)
      hideModal()
      setSyncStatus('unsynced')
    } else {
      if (username === undefined || isNull(username)) {
        setUsernameError('用户名不能为空')
        return
      }
      if (password === undefined || isNull(password)) {
        setPasswordError('密码不能为空')
        return
      }
      try {
        setIsSubmitting(true)
        const res =
          type === 'signIn'
            ? await User.signIn(username, password)
            : await User.signUp(username, password)
        if (res) {
          Database.putConfig({ username })
          setUsername?.(username)
          hideModal()
          setSyncStatus('unsynced')
        } else {
          setIsSubmitting(false)
          setPasswordError('密码错误')
        }
      } catch (ex) {
        setIsSubmitting(false)
        switch (ex.status) {
          case 404:
            setUsernameError('没有此用户')
            break
          case 409:
            setUsernameError('用户名已存在')
            break
          default:
            setUsernameError(ex.message)
        }
      }
    }
  }

  const AuthHeader = () => {
    let heading
    switch (type) {
      case 'connect':
        heading = '连接数据库'
        break
      case 'signIn':
        heading = '请登录'
        break
      case 'signUp':
        heading = '注册账号'
        break
    }

    return <Title>{heading}</Title>
  }

  const ActionButton = () => {
    let label
    switch (type) {
      case 'connect':
        label = '连接'
        break
      case 'signIn':
        label = '登录'
        break
      case 'signUp':
        label = '注册'
        break
    }

    return (
      <PrimaryButton
        styles={buttonStyles}
        disabled={isSubmitting}
        onClick={onSubmit}
      >
        {label}
      </PrimaryButton>
    )
  }

  const onChange = (
    type: 'url' | 'username' | 'password',
    value: string | undefined
  ) => {
    switch (type) {
      case 'url':
        setUrlError(undefined)
        break
      case 'username':
        setUsernameError(undefined)
        break
      case 'password':
        setPasswordError(undefined)
    }
    setFormData({ ...formData, ...{ [type]: value } })
  }

  return (
    <Modal isOpen isBlocking={type === 'connect'} onDismiss={hideModal}>
      {type === 'connect' || (
        <RightButton iconProps={{ iconName: 'Cancel' }} onClick={hideModal} />
      )}
      <StyledAuth>
        <AuthHeader />
        <Stack>
          {type === 'connect' ? (
            <TextField
              borderless
              errorMessage={urlError}
              placeholder="coryori://"
              spellCheck="false"
              styles={textFieldStyles}
              onChange={(e, value) => onChange('url', value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') onSubmit()
              }}
            />
          ) : (
            <>
              <TextField
                borderless
                errorMessage={usernameError}
                placeholder="用户名"
                spellCheck="false"
                styles={textFieldStyles}
                onChange={(e, value) => onChange('username', value)}
              />
              <TextField
                borderless
                errorMessage={passwordError}
                placeholder="密码"
                type="password"
                styles={textFieldStyles}
                onChange={(e, value) => onChange('password', value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') onSubmit()
                }}
              />
            </>
          )}
          <ActionButton />
        </Stack>
      </StyledAuth>
    </Modal>
  )
}

export default Auth
