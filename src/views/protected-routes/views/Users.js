import { useFetchUsers } from '../api/hooks/useFetchUsers';

const Users = () => {
	const { users } = useFetchUsers();

	console.log(users);

	return (
		<article>
			<h2>Users List</h2>
			{users?.length ? (
				<ul>
					{users.map((user) => {
						return <li key={user.id}>{user.username}</li>;
					})}
				</ul>
			) : (
				<p>No Users to Display!</p>
			)}
		</article>
	);
};

export default Users;
