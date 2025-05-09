import fetchUsers from "@/actions/fetchUsers";
import AsideBars from "@/components/AsideBars";
import EmptyList from "@/components/EmptyList";
import SortingUsersSelect from "@/components/SortingUsers";
import UsersList from "@/components/UsersList";

type UsersPageProps = {
  searchParams: Promise<SearchParamsType>
}
export default async function Home({ searchParams }: UsersPageProps
) {
  const { cities: citiesQuery,
    companies: companiesQuery,
    search,
    sort,
    order
  } = await searchParams
  const [filteredUsersData, usersData] = await Promise.all([fetchUsers(citiesQuery, companiesQuery, search, sort, order), fetchUsers()]);

  const cities = [...new Set(usersData.users.map((user) => user.address.city))];
  const companies = [...new Set(usersData.users.map((user) => user.company.name))];

  return (
    <>
      <h1 className="text-3xl font-bold text-center">User&apos;s List App</h1>
      <div className="flex flex-1 lg:justify-between flex-col lg:flex-row lg:w-full gap-5 lg:gap-0 relative w-[70%] md:w-[90%] min-w-[300px]">
        <AsideBars
          cities={cities}
          companies={companies}
        />
        <section className="lg:w-3/4 space-y-5 lg:space-y-10 lg:pl-5">

          <SortingUsersSelect />

          {filteredUsersData.users.length > 0 ? (
            <UsersList
              users={filteredUsersData.users}
            />
          ) : (
            <EmptyList />
          )}
        </section>
      </div>
    </>
  );
}
