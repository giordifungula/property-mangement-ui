// Entities
import { AuthStore } from './auth.store';
import { DocumentStore } from './document.store';
import { PropertyStore } from './properties.store';
import { UserStore } from './users.store';

export type IRootStore = RootStore;

class RootStore {
  initialState: Partial<RootStore> | undefined;
  // Entities to add entities below
  auth: AuthStore;
  users: UserStore;
  documents: DocumentStore;
  properties: PropertyStore;

  // todo to add entities that match the api services
  constructor(initialState: Partial<RootStore> | undefined) {
    this.initialState = initialState;
    // todo to add entities and non entities

    this.users = new UserStore(this, 'users');

    this.documents = new DocumentStore(this, 'documents');
    this.properties = new PropertyStore(this, 'properties');
    this.auth = new AuthStore(this);
  }
}

export default RootStore;
