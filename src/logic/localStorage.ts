import { IRootStore } from './store/stores/root';

const stateName = 'enlabeler-task';

export const loadState = (): Partial<IRootStore> | undefined => {
	try {
		const serializedState = localStorage.getItem(stateName);
		if (serializedState == null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		console.log('Could not parse local state', err);
		return undefined;
	}
};

interface ILocalStorage {
	auth: {
		accessToken?: string | null;
		userId?: number | null;
	};
}

export const saveState = (state: Partial<ILocalStorage>) => {
	try {
		const currentState = loadState() || {};
		const serializedState = JSON.stringify({ ...currentState, ...state });
		localStorage.setItem(stateName, serializedState);
	} catch (err) {
		console.error('error on save state ', err);
	}
};
