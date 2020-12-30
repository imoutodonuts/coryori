import PouchDb from 'pouchdb'
import PouchDbFind from 'pouchdb-find'

PouchDb.plugin(PouchDbFind)

interface Config {
  url: string
  username: string
}

class Database {
  remote: PouchDB.Database

  static local = new PouchDb('coryori')

  constructor(url: string) {
    url = atob(url.match(/(?<=coryori:\/\/)\S+/)?.[0] ?? '')
    this.remote = new PouchDb(url)
  }

  static async getConfig() {
    const res = await Database.local.get<Partial<Config>>('_local/config')
    return res
  }

  static async putConfig(newConfig: Partial<Config>) {
    try {
      const oldConfig = await this.getConfig()
      return await Database.local.put({
        ...oldConfig,
        ...newConfig,
        _id: '_local/config',
      })
    } catch (ex) {
      if (ex.status === 404) {
        Database.local.put({
          ...newConfig,
          _id: '_local/config',
        })
      }
    }
  }

  sync(completeCallback: () => void, errorCallback: () => void) {
    try {
      Database.local
        .sync(this.remote)
        .on('complete', completeCallback)
        .on('error', errorCallback)
    } catch (ex) {
      errorCallback()
    }
  }
}

export default Database
