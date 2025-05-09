type UserType = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};

type UsersResponse = {
    message: string;
    success: boolean;
    users: UserType[];
};

type SearchParamsType = {
    sort?: SortQueryType;
    order?: OrderQueryType;
    cities?: string[];
    companies?: string[];
    search?: string;
};

type SortQueryType = 'username' | 'name' | undefined;

type OrderQueryType = 'asc' | 'desc' | undefined;
