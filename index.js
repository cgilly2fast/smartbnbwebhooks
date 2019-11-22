const express = require('express')
const path = require('path');
const mysql = require('mysql')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: ""
});

db.connect(function (err) {
    if (err) throw err;
});

app.post('/', function (req, res) {

    fs.readFile('data.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            const file = JSON.parse(data);

            file.records.push(req.body);

            const json = JSON.stringify(file);

            fs.writeFileSync('data.json', json, 'utf8');
        }
    });

    db.query(`
        INSERT INTO reservation (
            Guest_fk, 
            Listing_fk, 
            UserId, 
            ListingTitle, 
            Nights, 
            Status, 
            Guests, 
            Adults, 
            Children,
            Infants,
            StartDate,
            Checkintime,
            EndDate,
            CheckoutTime,
            Currency,
            PerNightPrice,
            BasePrice,
            SecurityDeposite,
            Subtotal,
            Tax,
            GuestFee,
            CleaningFee,
            Payout,
            BadReview,
            Cleaned,
            QualityChecked,
            ETA,
            ETD,
            CreatedAt,
            UpdatedAt,
            SentAt
        )
        VALUES (
            ${r.data.guest.id},
            ${r.data.listing.id},
            ${r.data.user_id},
            ${r.data.listing.name},
            ${r.data.nights},
            ${r.data.status},
            ${r.data.guests},
            ${r.data.adults},
            ${r.data.children},
            ${r.data.infants},
            ${r.data.start_date},
            ${r.data.checkin_time},
            ${r.data.end_date},
            ${r.data.checkout_time},
            ${r.data.currency},
            ${r.data.per_night_price},
            ${r.data.base_price},
            ${r.data.security_price},
            ${r.data.subtotal},
            ${r.data.tax_amount},
            ${r.data.guest_fee},
            ${r.data.host_service_fee},
            ${r.data.payout_price},
            "",
            "",
            "",
            "",
            "",
            ${r.data.created_at},
            ${r.data.updated_at},
            ${r.data.sent_at}
        )
        `, (err, res, fields) => {

    })

})

const server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});
