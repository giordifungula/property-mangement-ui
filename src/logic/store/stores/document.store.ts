import { makeObservable, action, runInAction } from 'mobx';
import { API_ENTITIES } from '..';
import EntityStore from '../createEntityStore';
import { handleStoreError } from './handleError';
import { IRootStore } from './root';
import { uploadFile } from 'logic/api';

export interface IDocumentWrite {
  name: string;
  path: string;
  // relationships
  userId: number;
  propertyId: number;
}

export interface IDocumentRead extends IDocumentWrite {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class DocumentStore extends EntityStore<IDocumentRead, IDocumentWrite> {
  constructor(store: IRootStore, entity: API_ENTITIES) {
    super(store, entity);
    makeObservable(this, {
      // Actions
      uploadDocument: action
    });
  }

  async uploadDocument(payload: {
    uploadObject: Blob;
    id: string;
    progressUpdate: (prorgress: number) => void;
  }) {
    try {
      this.loading = true;
      const { uploadObject, id, progressUpdate } = payload;
      console.log('uploadObject', uploadObject);
      const result = await uploadFile({
        fileName: `document-${id}`,
        file: uploadObject,
        progressUpdate
      });

      console.log('result after upload', result);

      if (result.success === true) {
        return { result: result.url, success: result.success };
      }

      throw new Error('Document could not be uploaded');
    } catch (err: any) {
      runInAction(() => {
        handleStoreError(err, {
          id: 'documents-uploadDocument',
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
