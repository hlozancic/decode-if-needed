const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
const decodeIfNeeded = require('../src/decodeIfNeeded')

const results = []
fs.createReadStream(path.join(__dirname, 'nonstandard-windows1252.csv'))
    .pipe(decodeIfNeeded()) // here the magic happens :)
    .pipe(csv({
            separator: ';',
            mapHeaders: ({header, index}) => header.trim().toLowerCase(),
        },
    ))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results)
    })
