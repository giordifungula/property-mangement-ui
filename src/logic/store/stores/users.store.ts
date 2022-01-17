import { runInAction, action, makeObservable } from 'mobx';
// @logic
import { API_ENTITIES } from '..';
// @local
import { IRootStore } from './root';
import { handleStoreError } from './handleError';
import EntityStore from '../createEntityStore';

export type TRole = 'admin' | 'owner' | 'regular';

export interface IUserWrite {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: TRole;
}

export interface IUserRead extends IUserWrite {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UserStore extends EntityStore<IUserRead, IUserWrite> {
  constructor(store: IRootStore, entity: API_ENTITIES) {
    super(store, entity);
    makeObservable(this, {
      // add methods and actions here
      register: action
    });
  }

  async register(payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: TRole;
  }) {
    try {
      this.loading = true;
      await this.create(payload);
      const result = await this.store.auth.login(
        payload.email,
        payload.password
      );

      return result;
    } catch (err: any) {
      runInAction(() => {
        handleStoreError(err, {
          id: 'users-register',
          store: this.store
        });
      });

      return { success: false, message: err.message };
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
