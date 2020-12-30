import React from 'react'
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import { SyncStatus } from '../App'
import ToTop from '../components/ToTop'
import Preview from '../pages/Preview'
import Recipes from '../pages/Recipes'
import Upload from '../pages/Upload'

interface Props {
  username: string | undefined
  syncStatus: SyncStatus | undefined
  setSyncStatus: (syncStatus: this['syncStatus']) => void
}

const Router = ({ username, syncStatus, setSyncStatus }: Props) => {
  const PrivateRoute = <T extends RouteProps>({ children, ...rest }: T) => (
    <Route
      {...rest}
      render={() => (username === undefined ? <Redirect to="/" /> : children)}
    />
  )

  return (
    <Switch>
      <Route path="/recipes/:author/:title">
        <ToTop />
        <Preview username={username} />
      </Route>
      <Route path="/recipes/:author">
        <ToTop />
        <Recipes />
      </Route>
      <Route path="/recipes">
        <ToTop />
        {syncStatus === 'synced' && <Recipes />}
      </Route>
      <PrivateRoute path="/upload">
        <ToTop />
        <Upload author={username!} setSyncStatus={setSyncStatus} />
      </PrivateRoute>
      <Route path="/">
        <Redirect to="/recipes" />
      </Route>
    </Switch>
  )
}

export default Router
