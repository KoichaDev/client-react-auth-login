import { useFetchUsers } from '../api/hooks/useFetchUsers';

const Users = () => {
	const { users } = useFetchUsers();

	return (
		<article>
			<h2>Users List</h2>
			{users?.length ? (
				<ul>
					{users.map((users) => {
						const { _id: id, username } = users;
						return <li key={id}>{username}</li>;
					})}
				</ul>
			) : (
				<p>No Users to Display!</p>
			)}
		</article>
	);
};

export default Users;
