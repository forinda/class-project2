import { Router } from 'express';

export const testRoute = ({ app }: { app: Router }) => {
	const router = Router();
	app.use(router);
	router.get('/test', async (req, res) => {
		return res.status(200).send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
    <style>
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        body{
            padding: 40px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, Helvetica, sans-serif;
        }
        .container{
            padding: 20px;
            box-shadow:  0 0 .5rem #0000005d;
            border: .2px solid #0000005d;
            color: #ffffff;
            background-color: #061b30;
            border-radius: 10px;
        }
    </style>

</head>
<body>
    <div class="container">

        <p>App test route working</p>
    </div>
</body>
</html>
        `);
	});
};
