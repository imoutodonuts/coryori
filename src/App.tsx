import { createTheme, initializeIcons, loadTheme } from '@fluentui/react'
import { useBoolean } from '@uifabric/react-hooks'
import React, { useEffect, useMemo, useState } from 'react'
import { Database } from './api'
import Auth from './components/Auth'
import Header from './components/Header'
import Router from './router'

initializeIcons()
loadTheme(
  createTheme({
    defaultFontStyle: { fontFamily: 'inherit', fontSize: 'inherit' },
  })
)

export type SyncStatus = 'unsynced' | 'syncing' | 'synced'

const App = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>()
  const [url, setUrl] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [
    isAuthModalOpen,
    { setTrue: showAuthModal, setFalse: hideAuthModal },
  ] = useBoolean(false)

  const remoteDb = useMemo(() => {
    if (url !== undefined) return new Database(url)
  }, [url])

  useEffect(() => {
    getConfig()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (url !== undefined && syncStatus === 'unsynced') {
      const completeCallback = () => {
        setSyncStatus('synced')
      }

      const errorCallback = () => {
        setUrl(undefined)
        setSyncStatus(undefined)
        showAuthModal()
      }

      setSyncStatus('syncing')
      remoteDb?.sync(completeCallback, errorCallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncStatus])

  const getConfig = async () => {
    try {
      const res = await Database.getConfig()
      setUrl(res.url)
      setUsername(res.username)
      setSyncStatus('unsynced')
    } catch (ex) {
      showAuthModal()
    }
  }

  return (
    <div>
      {isAuthModalOpen && (
        <Auth
          type="connect"
          setUrl={setUrl}
          setSyncStatus={setSyncStatus}
          hideModal={hideAuthModal}
        />
      )}
      <Header
        syncStatus={syncStatus}
        setSyncStatus={setSyncStatus}
        username={username}
        setUsername={setUsername}
      />
      <Router
        username={username}
        syncStatus={syncStatus}
        setSyncStatus={setSyncStatus}
      />
    </div>
  )
}

export default App
