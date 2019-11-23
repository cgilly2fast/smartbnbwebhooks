const express = require('express')
const path = require('path');
const mysql = require('mysql')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var db = mysql.createConnection({
    host: 'localhost',
    database: 'smartbnb',
    port: '3306',
    user: 'root',
    password: ''
});

db.connect(function (err) {
    if (err) throw err;
});

app.post('/', function (req, res) {

    console.log(req.body)

    db.query(
        `INSERT INTO reservation (
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
            Subtotal,
            Tax,
            GuestFee,
            CleaningFee,
            Payout,
            BadReview,
            Cleaned,
            QualityChecked,
            CreatedAt,
            UpdatedAt,
            SentAt
        )
        VALUES (
            '${req.body.guest.id}',
            '${req.body.listing.id}',
            '${req.body.user_id}',
            '${req.body.listing.name}',
            '${req.body.nights}',
            '${req.body.status}',
            '${req.body.guests}',
            '${req.body.adults}',
            '${req.body.children}',
            '${req.body.infants}',
            ${db.escape(req.body.start_date)},
            ${db.escape(req.body.checkin_time)},
            ${db.escape(req.body.end_date)},
            ${db.escape(req.body.checkout_time)},
            '${req.body.currency}',
            '${req.body.per_night_price}',
            '${req.body.base_price}',
            '${req.body.subtotal}',
            '${req.body.tax_amount}',
            '${req.body.guest_fee}',
            '${req.body.host_service_fee}',
            '${req.body.payout_price}',
            '',
            '',
            '',
            ${db.escape(req.body.created_at)},
            ${db.escape(req.body.updated_at)},
            ${db.escape(req.body.sent_at)}
        )`, (err, res, fields) => {
        if (err) throw err;
        db.query(
            `INSERT INTO guest (
                    Reservation_fk, 
                    FirstName, 
                    LastName, 
                    PictureURL, 
                    Phone, 
                    PlatformEmail, 
                    Email, 
                    City, 
                    State, 
                    AllowBack, 
                    Comment,
                    AddedOn
                )
                VALUES (
                    '${fields.id}',
                    '',
                    '${req.body.guest.first_name}',
                    '${req.body.guest.last_name}',
                    '${req.body.guest.picture_url}',
                    '${req.body.guest.phone}',
                    '',
                    '${req.body.guest.email}',
                    '${req.body.guest.location}',
                    '${req.body.guest.location}',
                    '',
                    '',
                    ''
                )`, (err, res, fields) => {
            if (err) throw err;
        })
    })


})

const server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});
