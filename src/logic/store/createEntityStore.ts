import {
	action,
	computed,
	makeObservable,
	observable,
	runInAction,
	toJS,
} from 'mobx';
// @logic
import { API_ENTITIES } from '.';
import * as apiActions from '../api';
// @components
import { normalizeData } from 'utilities/normalize';
// @local
import { IRootStore } from './stores/root';
import { handleStoreError } from './stores/handleError';

const initialMeta = {
	total: 0,
	limit: 10,
	skip: 0,
};

export type IMeta = typeof initialMeta;

export type IEntityCreate<
	T,
	K extends string | number | symbol = 'id' | 'createdAt' | 'updatedAt',
> = Omit<T, K>;

class EntityStore<IEntityRead extends { id: number }, IEntityWrite> {
	map: { [id: number]: IEntityRead };
	loading: boolean;
	meta: IMeta;
	store: IRootStore;
	entity: API_ENTITIES;

	constructor(store: IRootStore, entity: API_ENTITIES) {
		this.store = store;
		this.entity = entity;
		this.map = {};
		this.loading = false;
		this.meta = initialMeta;
		makeObservable(this, {
			// Obserevables
			store: observable,
			map: observable,
			loading: observable,
			meta: observable,
			// @logic
			fetchAll: action,
			fetch: action,
			update: action,
			remove: action,
			create: action,
			clear: action,
			setLoadingState: action,
			setMeta: action,
			// Computed
			all: computed,
		});
	}

	defaultSort = {
		$sort: {
			id: 1,
		},
	} as apiActions.IQuery<IEntityRead>;

	async fetchAll({
		query = this.defaultSort,
		updateAppState = true,
	}: {
		query?: apiActions.IQuery<IEntityRead>;
		updateAppState?: boolean;
	}) {
		try {
			this.loading = true;
			const { data, meta } = await apiActions.getAll<IEntityRead>(
				this.entity,
				{
					...query,
					$sort: { ...query.$sort, ...this.defaultSort.$sort } as {
						[key in keyof Partial<IEntityRead>]: 1 | -1;
					},
				},
			);

			runInAction(() => {
				if (updateAppState) {
					this.map = normalizeData([
						...Object.values(this.map),
						...data,
					]);
					this.meta = meta;
				}
			});

			return {
				success: true,
				entities: data as IEntityRead[],
				meta,
			};
		} catch (err: any) {
			runInAction(() => {
				handleStoreError(err, {
					id: `${this.entity}-fetchAll`,
					store: this.store,
				});
			});

			return { success: false, message: err.message };
		} finally {
			runInAction(() => {
				this.loading = false;
			});
		}
	}

	async fetch({
		id,
		updateAppState = true,
	}: {
		id: number;
		updateAppState?: boolean;
	}) {
		try {
			this.loading = true;

			const { data, meta } = await apiActions.get<IEntityRead>(
				this.entity,
				id,
			);

			runInAction(() => {
				if (updateAppState) {
					this.map[id] = data;
					this.meta = meta;
				}
			});

			return {
				success: true,
				entity: data,
			};
		} catch (err: any) {
			runInAction(() => {
				handleStoreError(err, {
					id: `${this.entity}-fetch`,
					store: this.store,
				});
			});

			return { success: false, message: err.message };
		} finally {
			runInAction(() => {
				this.loading = false;
			});
		}
	}

	async create(payload: Partial<IEntityWrite>) {
		try {
			this.loading = true;
			const { data } = await apiActions.create<IEntityRead, IEntityWrite>(
				this.entity,
				payload,
			);

			if (data)
				runInAction(() => {
					this.map[data.id] = data;
					this.meta.total += 1;
				});

			return {
				success: true,
				entity: data,
			};
		} catch (err: any) {
			runInAction(() => {
				handleStoreError(err, {
					id: `${this.entity}-create`,
					store: this.store,
				});
			});

			return { success: false, message: err.message };
		} finally {
			runInAction(() => {
				this.loading = false;
			});
		}
	}

	async remove(id: number) {
		try {
			this.loading = true;
			const { meta, data } = await apiActions.remove<IEntityWrite>(
				this.entity,
				id,
			);

			runInAction(() => {
				const unqiueEntities = this.all.filter(
					(n) => String(n.id) !== String(id),
				);
				this.map = normalizeData(unqiueEntities);
				this.meta = meta;
			});

			return {
				success: true,
				entity: data,
			};
		} catch (err: any) {
			runInAction(() => {
				handleStoreError(err, {
					id: `${this.entity}-remove`,
					store: this.store,
				});
			});

			return { success: false, message: err.message };
		} finally {
			runInAction(() => {
				this.loading = false;
			});
		}
	}

	async update(id: number, payload: Partial<IEntityWrite>) {
		try {
			this.loading = true;
			const { data, meta } = await apiActions.update<
				IEntityRead,
				IEntityWrite
			>(this.entity, id, payload);

			runInAction(() => {
				this.map[id] = data;
				this.meta = meta;
			});

			return {
				success: true,
				entity: data as IEntityRead,
			};
		} catch (err: any) {
			runInAction(() => {
				handleStoreError(err, {
					id: `${this.entity}-update`,
					store: this.store,
				});
			});

			return { success: false, message: err.message };
		} finally {
			runInAction(() => {
				this.loading = false;
			});
		}
	}

	clear() {
		this.map = {};
		this.meta = initialMeta;
	}

	setMeta(meta: IMeta) {
		this.meta = meta;
	}

	setLoadingState(state: boolean) {
		this.loading = state;
	}

	get all() {
		return Object.values(toJS(this.map));
	}

	getById(id: number) {
		return toJS(this.map[id]) as null | IEntityRead;
	}
}

export default EntityStore;
