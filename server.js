import express from 'express';
import getData  from './dataFetcher.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());


app.post('/fetch-grades', async (req, res) => {

    const semesterChosen = Number(req.body.sem);

    const data = await getData(semesterChosen);

    res.json(data);

})


app.listen(3000);