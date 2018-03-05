const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(bodyParser.json())
app.use(cors())

// app.use(express.static(`${__dirname}/../build`));

const dealsCtrl = require('./controllers/deals_controller');
app.get('/api/deals', dealsCtrl.viewDeals);
app.post('/api/deals', dealsCtrl.addDeal);
app.get('/api/deals/location', dealsCtrl.generateCoordinates);
app.post('/api/deals/distance', dealsCtrl.calcDistance, dealsCtrl.generateCoordinates);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

// const path = require('path')
// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// })