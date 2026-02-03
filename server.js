import express from 'express';
import getData  from './dataFetcher.js';
import getFreshCookie  from './getCookie.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());


app.post('/fetch-grades', async (req, res) => {

    const semesterChosen = Number(req.body.sem);

    const freshID = await getFreshCookie("PRIVATE INFO", "PRIVATE INFO");

    if (freshID) {
        const data = await getData(semesterChosen, freshID);
        res.json(data);
    } else {
        res.status(500).json({ error: "Login failed" });
    }

})


app.listen(3000);