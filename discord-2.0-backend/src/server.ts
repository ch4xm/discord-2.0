import dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.listen(3010, () => {
	console.log('Server Running on port 3010');
	console.log('API Testing UI: http://localhost:3010/api/v0/docs/');
});
