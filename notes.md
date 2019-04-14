#----------------------plan--------------------------------------------

PROGRESSYWNA APLIKACJA DO WYSYŁANIA WIADOMOSCI I WIDEO CONFERĘCJI

1. TECHNOLOGIA - MEAN STACK
2. SERVER - EXPRESS
3. CLIENT - ANGULAR
4. STYLING - SASS
5. CONFIG LAYOUT .JSON, STRINGS LANF .JSON
6. POŁĄCZENIE - WEBSOCKET
7. VIDEO - WEB-RTC
8. DODATKOWO - PWA

#----------------------------------------------------------
#jak starczy czasu

9. TERAZ JEDNA BAZA JEDNA KOLEKCJA / LEPIEJ JEDNA BAZA KILKA KOLEKCJI


#----------------------------------------------------------
#mongo

sudo service mongod start
sudo service mongod stop
sudo service mongod restart

> db.<name-collection>.find().pretty()

#----------------------------------------------------------
#progresive web app

>angular-cli.json
"ServiceWorker": true

>npm i --save @angular/service-worker
>ng build --prod

>nowy plik w katalogu głównym
ngsw-manifest.json

do testowania katalogu dist
>ng serve --prod

#----------------------------------------------------------
#npm / cli

ng new progressiveMessangerShadowApp --style=sass --routing


#nie działa
--mobile


npm install pug-cli --save-dev


npm install npm-run-all --save-dev


npm i socket.io --save

#-----------------gitignore-------------
#---------------------pug------------------------
/src/**/*.html

 "assets": [
        "manifest.json"
      ],


npm i sw-precache-webpack-plugin --save-dev



#-------------------precache-config.js---------------------------------

var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')


module.exports = {
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [/^(?!\/__)/], // do zabezpieczen firebase OAuth
    stripPrefix: 'dist',
    root: 'dist/',
    plugins: [
        new SWPrecacheWebpackPlugin({
            cacheId: 'firestarter',
            filenae: 'service-worker.js',
            staticFileGlobs: [
                'dist/index.html',
                'dist/**.js',
                'dist/**.css'
            ],
            stripPrefix: 'dist/assets/',    // striptPrefixMulti is also supported
            mergeStaticsConfig: true
        })
    ]
}

#-----------------------manifest.json------------------------------------------------
{
    "name": "Messanger Shadow App",
    "short_name": "MSA",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
        }
    ],
    "theme_color": "#f48c5b",
    "background_color": "#ffffff",
    "start_url": "/",
    "display": "standalone",
    "orientation": "portrait"
  }
  

#---------------------------ngsw-manifest-------------------------------

{
    "external": {
        "urls": [
            {"url": ""}
        ]
    },
    "static.ignore": [
        "\\.js\\.map$"
    ],
    "dynamic": {
        "group": [
            {
                "name": "pobranie zdjęć",
                "urls": {
                    "https://firebasestorage.googleapis.com/": {
                        "match": "prefix"
                    }
                },
                "cache": {
                    "optimalizeFor": "performance",
                    "maxAgeMs": 60000,
                    "maxEntries": 40
                }
            }
        ]
    },
    "routing": {
        "index": "/index.html",
        "routes": {
            "/": {
                "prefix": false
            },
            "/login": {
                "prefix": true
            },
            "/register": {
                "prefix": true
            },
            "/users": {
                "prefix": true
            },
            "/profile": {
                "prefix": true
            }
        }
    }
}










































