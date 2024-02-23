'use strict';

// N.B. Encoding problems are being caused by jsonwebtoken
// https://github.com/auth0/node-jsonwebtoken/pull/59
var express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
    axios = require('axios').default,
    https = require('https'),
    cors = require('cors');


// ADFS Configuration
// gie 
// const adfsMetadataUrl = "https://adfsdev.mahidol.ac.th/adfs/.well-known/openid-configuration",
//     adfsClientID = "04ee561a-7689-45ba-9fff-b8f723ce1b62",
//     adfsClientSecret = "akEMiYGqIsAX4ellPpy40WKpnu_yvZZs99B8_gCo",
//     adfsRedirectUrl = "http://10.20.5.199:4000/callback",
//     adfsResourceID = "a5f9c69c-5023-479f-bd5e-9c5f19584ab7";

const adfsMetadataUrl = "https://idp.mahidol.ac.th/adfs/.well-known/openid-configuration",
    adfsClientID = "53c7432c-2614-44b1-8413-e35e1c89deee",
    adfsClientSecret = "gMwj1K8-YcEGFHFS-GA5pZMbQc22ygzPte_VxKRM",
    adfsRedirectUrl = "https://mb.mahidol.ac.th/mbenter/callback",
    adfsResourceID = "a58c1fd8-1b57-4044-b9cb-e3b958544a85";

//console.warn('Not verifying HTTPS certificates');
https.globalAgent.options.rejectUnauthorized = false;

function validateAccessToken(accessToken, adfsSigningPublicKey) {
    var payload = null;
    try {
        payload = jwt.verify(accessToken, adfsSigningPublicKey);
    }
    catch (e) {
        console.warn('Dropping unverified accessToken', e);
    }
    return payload;
}

async function getAdfsMetadata(url) {
    const response = await axios.get(url);
    //console.log(response.data);
    return response.data;
}

async function getAdfsPublicKey(url) {
    const response = await axios.get(url);
    //console.log(response.data);
    var key = "-----BEGIN CERTIFICATE-----\n" + response.data.keys[0].x5c[0] + "\n-----END CERTIFICATE-----";
    return key;
}

const main = async () => {

    var adfsMetadata = await getAdfsMetadata(adfsMetadataUrl);
    var publicKey = await getAdfsPublicKey(adfsMetadata.jwks_uri);

    // Default response_type : 'code'
    // Default grant_type : 'authorization_code'
    var strategy = new OAuth2Strategy({
        authorizationURL: adfsMetadata.authorization_endpoint,
        tokenURL: adfsMetadata.token_endpoint,
        clientID: adfsClientID, // This is just a UID I generated and registered
        clientSecret: adfsClientSecret, // This is ignored but required by the OAuth2Strategy
        callbackURL: adfsRedirectUrl,
        scope: 'allatclaims'
    },
        function (accessToken, refreshToken, profile, done) {
            if (refreshToken) {
                console.log('Received but ignoring refreshToken (truncated)', refreshToken.substr(0, 25));
            } else {
                console.log('No refreshToken received');
            }
            done(null, profile);
        });
    strategy.authorizationParams = function (options) {
        return {
            resource: adfsResourceID // An identifier corresponding to the RPT
        };
    };

    strategy.userProfile = function (accessToken, done) {
        done(null, accessToken);
    };
    passport.use('provider', strategy);
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    // Configure express app
    app.use(express.json())
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(cors())
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        //res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        next();
    })

    let source
    //app.get('/login', passport.authenticate('provider'));  //backup
    app.get('/login', (req, res, next) => {
        console.log('/login : ', req.query.src)
        if (req.query.src) source = req.query.src;

        passport.authenticate('provider')(req, res, next)
    });  //backup

    app.get('/callback', passport.authenticate('provider'), function (req, res) {
        // Beware XSRF...
        // res.cookie('accessToken', req.user);
        // console.log(req.user + ' at line 123')
        // res.redirect('/');


        let dst = ""
        const params = "?c=" + req.user + "&vfy=pass";

        // let sendto = 'http://10.20.5.199:8010/#/'
        //console.log(source)

        // if (source == "idp") dst = sendto
        // else if (source == "elec") dst = sendto
        // else if (source == "appeal") dst = sendto
        // else if (source == "pamb") dst = sendto   //หน้าpa งานแผน
        // else if (source == "pamb64") dst = sendto  //งานพัฒนาคุณภาพ
        // else if (source == "fix") dst = sendto
        // else if (source == "residenz") dst = sendto + 'login'
        // else if (source == "mbhr1") dst = sendto
        // else if (source == "pape") dst = sendto
        // else if (source == "mb_room") dst = sendto
        // else if (source == "artam") dst = sendto
        // else if (source == "receiptMB") dst = sendto
        // else if (source == "mbit") dst = sendto
        // else if (source == "GPMS") dst = sendto
        // else if (source == "mbasset") dst = sendto
        // else if (source == "science_tool") dst = sendto

        // else if (source == "mbform") dst = sendto
        // else if (source == "receipt67") dst = sendto

        if (source == "idp") dst = 'https://mb.mahidol.ac.th/idp/#/';
        else if (source == "pamb") dst = 'https://mb.mahidol.ac.th/mbpashowpdf/#/'
        else if (source == "pamb64") dst = 'https://mb.mahidol.ac.th/mbpashowpdf2565/#/'
        else if (source == "fix") dst = 'https://mb.mahidol.ac.th/fix/#/'
        else if (source == "appeal") dst = 'https://mb.mahidol.ac.th/appeal/#/'
        else if (source == "elec") dst = 'https://mb.mahidol.ac.th/election/#/'
        else if (source == "mbhr1") dst = 'https://mb.mahidol.ac.th/mbhr1/#/'
        else if (source == "pape") dst = 'https://mb.mahidol.ac.th/pape/#/'
        else if (source == "mb_room") dst = 'https://mb.mahidol.ac.th/mb_room/#/'
        else if (source == "residenz") dst = 'https://mb.mahidol.ac.th/residenz/#/login'
        else if (source == "artam") dst = 'https://mb.mahidol.ac.th/artlnwza007/#/'
        else if (source == "receiptMB") dst = 'https://mb.mahidol.ac.th/mod/#/'
        else if (source == "mbit") dst = 'https://mb.mahidol.ac.th/mbit/#/'
        else if (source == "GPMS") dst = 'https://mb.mahidol.ac.th/GPMS/#/'
        else if (source == "mbasset") dst = 'https://mb.mahidol.ac.th/mb_asset/#/'
        else if (source == "science_tool") dst = 'https://mb.mahidol.ac.th/sci_equipment/#/'

        else if (source == "mbform") dst = 'https://mb.mahidol.ac.th/mbform/#/'
        else if (source == "receipt67") dst = 'https://mb.mahidol.ac.th/mod67/#/'

        else if (source == "mb_lab") dst = 'http://10.62.52.118:3200/mb_lab/'  // seagames local
        //else if (source == "mb_lab") dst = 'https://mb.mahidol.ac.th/mb_lab/#'  // seagames server


        else dst = "https://mb.mahidol.ac.th/app"

        console.log(dst + params)
        res.redirect(dst + params)

    });
    app.get('/', function (req, res) {
        //console.log(req.cookies['accessToken'])
        req.user = validateAccessToken(req.cookies['accessToken'], publicKey);
        ///console.log(req.user)
        res.send(
            !req.user ? '<h1>Example NodeJS Authentication with "ADFS OpenID Connect".</h1><a href="/login">Log In</a><br/>' : '<a href="/logout">Log Out</a><br/>' +
                '<h1>Authentication sucess.</h1><span>User info: </span><pre>' + JSON.stringify(req.user, null, 2) + '</pre>');
    });
    app.get('/logout', function (req, res) {
        res.clearCookie('accessToken');
        // res.redirect(adfsMetadata.end_session_endpoint + '?post_logout_redirect_uri=' + adfsRedirectUrl);
        res.redirect(adfsMetadata.end_session_endpoint + '?post_logout_redirect_uri= https://mb.mahidol.ac.th/app');
    });

    app.post('/verify', (req, res) => {
        const token = req.body
        // console.log('publicKey '+publicKey);
        // console.log('publicKey '+publicKey);

        // console.log(new Date().toLocaleTimeString());
        // console.log('\ntoken ' + token.c);
        // console.log(new Date().toLocaleTimeString());
        jwt.verify(token.c, publicKey, (err, result) => {
            if (err) {

                console.log("err verify " + err)
                res.json({ msg: 'error' });
                res.end()
            } else {

                res.json({ msg: 'ok', payload: { accountname: result.winaccountname, email: result.sub } });
                res.end()
            }
        })
    })

    ////// เพิ่ม ///////
    app.get("/test", (req, res, next) => {
        console.log("test");
        res.json({ msg: "TEST GET" });
      }); //backup

    app.listen(3000);
    console.log('Express server started on port 3000');
}

main();