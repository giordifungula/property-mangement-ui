import EntityStore from '../createEntityStore';

type TPropertyTypes = 'rent' | 'sale' | 'rent_sale';
type TPropertyStatuses = 'active' | 'inactive' | 'sold';

export interface IPropertyWrite {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: number;
  yearBuilt: number;
  status: TPropertyStatuses;
  type: TPropertyTypes;
  // relationships
  userId: number;
}

export interface IPropertyRead extends IPropertyWrite {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class PropertyStore extends EntityStore<IPropertyRead, IPropertyWrite> {}
