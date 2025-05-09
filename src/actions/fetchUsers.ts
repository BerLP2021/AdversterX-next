async function fetchUsers(
    cities?: string[],
    companies?: string[],
    search?: string,
    sort?: SortQueryType,
    order?: OrderQueryType,
): Promise<UsersResponse> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            cache: 'force-cache',
        });
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        let data = await response.json();

        // Через маленьку базу юзерів фільтруємо по union принципу
        if (cities || companies) {
            data = data.filter(
                (user: UserType) =>
                    cities?.includes(user.address.city) || companies?.includes(user.company.name),
            );
        }

        if (search) {
            data = data.filter((user: UserType) =>
                user.name.toLowerCase().includes(search.toLowerCase()),
            );
        }

        if (sort && order) {
            data.sort((a: UserType, b: UserType) => {
                if (a[sort] < b[sort]) return order === 'asc' ? -1 : 1;
                if (a[sort] > b[sort]) return order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return {
            message: 'Users fetched successfully',
            success: true,
            users: data,
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            message: 'Error fetching users',
            success: false,
            users: [],
        };
    }
}

export default fetchUsers;
