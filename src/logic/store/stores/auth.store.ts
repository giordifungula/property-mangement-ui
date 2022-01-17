import { makeObservable, observable, runInAction, action } from 'mobx';
import { IRootStore } from 'logic/store/stores/root';
import { pathOr } from 'ramda';
import { IUserRead } from './users.store';
import client, { authenticateClient, destroyToken } from 'logic/api/client';
import { handleStoreError } from './handleError';

export class AuthStore {
  userId: number | null;
  accessToken: string | null;
  loading: boolean;
  store: IRootStore;

  constructor(store: IRootStore) {
    this.store = store;

    const state = pathOr(
      null,
      ['initialState', 'auth'],
      store
    ) as AuthStore | null;

    this.userId = state ? state.userId : null;
    this.accessToken = state ? state.accessToken : null;
    this.loading = false;
    makeObservable(this, {
      userId: observable,
      accessToken: observable,
      loading: observable,
      // to add actions below
      login: action,
      authenticate: action,
      logout: action
    });
  }

  async authenticate() {
    try {
      this.loading = true;
      const { accessToken, user } = await authenticateClient();

      runInAction(() => {
        this.accessToken = accessToken as string;
        this.userId = user.id;
      });

      return {
        success: true,
        data: { accessToken, user }
      };
    } catch (err: any) {
      runInAction(() => {
        handleStoreError(err, {
          store: this.store,
          id: 'AUTHENTICATE ERR',
          show: false
        });
      });

      return { success: false, message: err.message };
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async login(email: string, password: string) {
    try {
      this.loading = true;

      const { accessToken, user } = (await client.authenticate({
        strategy: 'local',
        email,
        password
      })) as {
        accessToken: string;
        user: IUserRead;
      };

      runInAction(() => {
        this.accessToken = accessToken;
        this.userId = user.id;
      });

      return { accessToken, user, success: true } as {
        accessToken: string;
        user: IUserRead;
        success: true;
      };
    } catch (err: any) {
      runInAction(() => {
        handleStoreError(err, {
          id: 'LOGIN ERR',
          store: this.store
        });
      });

      return { success: false, message: err.message, user: null };
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async logout() {
    try {
      this.loading = true;
      this.accessToken = null;
      this.userId = null;

      await client.logout();

      return { success: true };
    } catch (err: any) {
      runInAction(() => {
        handleStoreError(err, {
          id: 'LOGOUT ERR',
          store: this.store
        });
        destroyToken();
      });

      return { success: false, message: err.message };
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
