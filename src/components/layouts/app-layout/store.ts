import { makeAutoObservable } from 'mobx'

import { session } from '@/api/session'

export class AppStore {
  _orgId = session.organizationId

  constructor() {
    makeAutoObservable(this)
  }

  get orgId(): number | null {
    return this._orgId
  }

  set orgId(id: number) {
    this._orgId = id
  }

  changeOrg(id: number) {
    session.changeOrg(id)
    this.orgId = id
  }
}
