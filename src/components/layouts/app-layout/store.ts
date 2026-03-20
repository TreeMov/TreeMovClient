import { makeAutoObservable } from 'mobx'

import { session } from '@/api/session'

export class AppStore {
  orgId = session.organizationId

  constructor() {
    makeAutoObservable(this)
  }

  changeOrg(id: number) {
    session.changeOrg(id)
    this.orgId = id
  }
}
