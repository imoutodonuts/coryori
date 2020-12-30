import { Temporal } from 'proposal-temporal'
import { digest, getSalt } from '../utils'
import Database from './Database'

class User {
  _id: string
  type: 'user'
  username: string
  derived_key: string
  salt: string
  date: string

  constructor(
    username: User['username'],
    derived_key: User['derived_key'],
    salt: User['salt']
  ) {
    this._id = `user:${username}`
    this.type = 'user'
    this.username = username.replace(/\s+/g, '')
    this.derived_key = derived_key
    this.salt = salt
    this.date = Temporal.now.instant().toJSON()
  }

  static async signUp(username: string, password: string) {
    const salt = getSalt(64)
    const derived_key = await digest(salt + password)
    const user = new User(username, derived_key, salt)
    return await Database.local.put(user)
  }

  static async signIn(username: string, password: string) {
    const user = await Database.local.get<User>(`user:${username}`)
    const derived_key = await digest(user.salt + password)
    if (user.derived_key === derived_key) {
      return true
    } else {
      return false
    }
  }
}

export default User
