import express from 'express';
import getData  from './dataFetcher.js';
import getFreshCookie  from './getCookie.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());


app.post('/fetch-grades', async (req, res) => {

    const username = req.body.userName;
    const password = req.body.userPassword;
    const email = req.body.userEmail;

    const freshID = await getFreshCookie(`${username}`, `${password}`);

    if (freshID) {
        const data = await getData(freshID, email);
        res.json(data);
    } 
    else {
        res.status(500).json({ error: "Login failed" });
    }

})


app.listen(3000);