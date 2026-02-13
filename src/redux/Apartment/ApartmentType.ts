export interface ApartmentType {
	apartments: {
		amenities: string[];
		area: number;
		availability: boolean;
		balcony: boolean;
		bathrooms: number;
		bedrooms: number;
		createdAt: string;
		description: string;
		features: string[];
		featureImages: string[];
		floor: number;
		furnished: string;
		image: string;
		location: string;
		matchedCount: number;
		parking: boolean;
		price: number;
		proof_of_ownership: string;
		rejectedCount: number;
		requestedCount: number;
		sellerId: string;
		status: string;
		title: string;
		type: string;
		updatedAt: string;
		_id: string;
	}[];
	meta: {
		totalItems: number;
		totalPages: number;
		page: number;
		limit: number;
	};
}
