export interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  ratings: number;
  reviews: string[];
  unitsSoldInLastMonth: number;
}

export interface DerivedProduct extends Product {
  mostPurchased: boolean;
}
