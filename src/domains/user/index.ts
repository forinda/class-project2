import { Router } from 'express';
import { createUserRoute } from './routes/createUserRoute';
import { deleteUserRoute } from './routes/deleteUserRoute';
import { findUsersRoute } from './routes/findUsersRoute';
import { followUserRoute } from './routes/followUserRoute';
import { followersRoute } from './routes/followersRoute';
import { followingsRoute } from './routes/followingsRoute';
import { searchUserRoute } from './routes/searchUserRoute';
import { unfollowUserRoute } from './routes/unfollowUserRoute';
import { updateUserRoute } from './routes/updateUserRoute';

export function loadUserDomain({ app }: { app: Router }) {
	const userDomain = Router();
	app.use('/users', userDomain);
	createUserRoute({ app: userDomain });
	deleteUserRoute({ app: userDomain });
	searchUserRoute({ app: userDomain });
	updateUserRoute({ app: userDomain });
	findUsersRoute({ app: userDomain });
	followUserRoute({ app: userDomain });
	followingsRoute({ app: userDomain });
	followersRoute({ app: userDomain });
	unfollowUserRoute({ app: userDomain });
}
