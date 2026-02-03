import express from 'express';

const app = express();

app.use(express.static('public'));
app.use(express.json());


app.post('/fetch-grades', (req, res) => {

    const semesterChosen = req.body.sem;

})


app.listen(3000);