import EntityStore from '../createEntityStore';

export type TPropertyTypes =
	| 'apartment'
	| 'house'
	| 'flat'
	| 'estate'
	| 'villa';
export type TPropertyStatuses = 'active' | 'inactive' | 'sold';
export type TPropertyOccupancyType = 'rent' | 'sale' | 'rent_sale';

export interface IPropertyWrite {
	name: string;
	address: string;
	city: string;
	state: string;
	zip: number;
	price: number;
	bedrooms: number;
	bathrooms: number;
	sqft: number;
	lotSize: number;
	yearBuilt: number;
	status: TPropertyStatuses;
	type: TPropertyTypes;
	occupancyType: TPropertyOccupancyType;
	// relationships
	userId: number;
}

export interface IPropertyRead extends IPropertyWrite {
	id: number;
	createdAt: Date;
	updatedAt: Date;
}

export class PropertyStore extends EntityStore<IPropertyRead, IPropertyWrite> {}
