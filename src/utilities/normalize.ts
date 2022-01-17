import { normalize, schema } from 'normalizr';
import { pathOr } from 'ramda';

const entitySchema = new schema.Entity('items');

export function normalizeData<T>(data: T[]) {
  const transform = Array.isArray(data) ? [entitySchema] : entitySchema;
  const { entities } = normalize(data, transform);
  return pathOr({}, ['items'], entities);
}
