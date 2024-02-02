import { useFetchUsers } from '../api/hooks/useFetchUsers';

const Users = () => {
	const { users } = useFetchUsers();

	return (
		<article>
			<h2>Users List</h2>
			{users?.length ? (
				<ul>
					{users.map((user) => {
						console.log(user);
						return (
							<li key={user._id}>
								{user.firstName} {user.lastName}
							</li>
						);
					})}
				</ul>
			) : (
				<p>No Users to Display!</p>
			)}
		</article>
	);
};

export default Users;
