import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ENTITIES } from '../store';
import { SERVER_URL } from '../config';
import client, { getJWT } from './client';

interface UploadParams {
	fileName: string;
	file: Blob;
	progressUpdate?: (progress: number) => void;
}

export type ISubQuery = {
	$in?: string[] | number[];
	$nin?: string[] | number[];
	$lt?: number | Date;
	$lte?: number | Date;
	$gt?: number | Date;
	$gte?: number | Date;
	$ne?: string[] | number[];
	$ilike?: string | number;
};

type EntityFieldQueries<T> = {
	[key in keyof Partial<T>]: ISubQuery | boolean | number | string | null;
};

type QueryValueType = ISubQuery | boolean | number | string;

type TSelect<T> = keyof T;

export type IQuery<T> = EntityFieldQueries<T> & {
	$limit?: number;
	$skip?: number;
	$sort?: { [key in keyof Partial<T>]: 1 | -1 };
	$select?: TSelect<T>[];
	$or?: { [key in keyof Partial<T>]: QueryValueType }[];
	$search?:
		| { [key in keyof Partial<T>]: string | undefined }
		| { like: string | undefined };
};

export type API_END_POINTS = API_ENTITIES; //todo add the api end points here

const handleError = (err: Error) => {
	console.log('API Error::', err);
};

export const uploadFile = async ({
	fileName,
	file,
	progressUpdate,
}: UploadParams) => {
	try {
		const token = await getJWT();

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			onUploadProgress: (progressEvent: {
				loaded: number;
				total: number;
			}) => {
				const percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total,
				);

				if (progressUpdate) {
					progressUpdate(percentCompleted);
				}
			},
		};

		const formData = new FormData();
		formData.append('image', file, fileName);

		const uploadResult = await axios.post<{ url: string }>(
			`${SERVER_URL}uploads`,
			formData,
			config,
		);
		toast.success('Document has been uploaded');
		return { success: true, url: uploadResult.data.url };
	} catch (err) {
		console.log('UPLOAD ERR', `${SERVER_URL}uploads`, err);

		return { success: false, url: null };
	}
};

export const getAll = async <Entity>(
	entity: API_END_POINTS,
	query?: IQuery<Entity>,
) => {
	try {
		const response = (await client
			.service(entity)
			.find({ query })) as Promise<{
			meta: {
				limit: number;
				skip: number;
				total: number;
			};
			data: Entity[];
		}>;

		return response;
	} catch (err: any) {
		handleError(err);
		throw err;
	}
};

export const get = async <Entity>(entity: API_END_POINTS, id: number) => {
	try {
		const response = (await client.service(entity).get(id)) as Promise<{
			data: Entity;
			meta: {
				limit: number;
				skip: number;
				total: number;
			};
		}>;

		return response;
	} catch (err: any) {
		handleError(err);
		throw err;
	}
};

export const create = async <IEntityRead, IEntityWrite>(
	entity: API_END_POINTS,
	payload: Partial<IEntityWrite>,
) => {
	try {
		return client.service(entity).create(payload) as Promise<{
			data: IEntityRead;
			success: true;
			meta: {
				limit: number;
				skip: number;
				total: number;
			};
		}>;
	} catch (err: any) {
		handleError(err);
		throw err;
	}
};

export const update = <IEntityRead, IEntityWrite>(
	entity: API_END_POINTS,
	id: number,
	payload: Partial<IEntityWrite>,
) => {
	try {
		return client.service(entity).patch(id, payload) as Promise<{
			data: IEntityRead;
			meta: {
				limit: number;
				skip: number;
				total: number;
			};
		}>;
	} catch (err: any) {
		handleError(err);
		throw err;
	}
};

export const remove = <Entity>(entity: API_END_POINTS, id: number) => {
	try {
		return client.service(entity).remove(id) as Promise<{
			data: Entity;
			meta: {
				limit: number;
				skip: number;
				total: number;
			};
		}>;
	} catch (err: any) {
		handleError(err);
		throw err;
	}
};
