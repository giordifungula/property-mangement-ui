import React from 'react';
import { reaction } from 'mobx';
// Utilities
import { loadState, saveState } from '../localStorage';
import RootStore, { IRootStore } from './stores/root';

export type API_ENTITIES = 'users' | 'properties' | 'documents';
let initialState = undefined as undefined | Partial<IRootStore>;

const localState = loadState();

if (localState) {
  const json = localState;
  initialState = json;
}

let store: IRootStore | undefined;

export function initializeStore() {
  const rootStore = store ?? new RootStore(initialState);

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return rootStore;
  }

  if (rootStore) {
    // Save to localstorage
    reaction(
      () => rootStore.auth.accessToken,
      (accessToken) => {
        saveState({
          auth: {
            accessToken
          }
        });
      }
    );
    reaction(
      () => rootStore.auth.userId,
      (userId) => {
        saveState({
          auth: {
            userId
          }
        });
      }
    );
  }

  // Create the store once in the client
  if (!store) {
    store = rootStore;
  }

  return store;
}

export function createStore() {
  return initializeStore();
}

const RootStoreContext = React.createContext<null | IRootStore>(null);

export const { Provider } = RootStoreContext;

export function useStore() {
  const rootStore = React.useContext(RootStoreContext);
  if (rootStore === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }

  return rootStore;
}
