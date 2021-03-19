const chardet = require('chardet')
const iconv = require('iconv-lite')
const {Transform} = require('stream')

const allowedEncodings = new Set(['utf8', 'utf-8', 'win1250', 'win-1250', 'windows1250', 'windows-1250'])

module.exports = function decodeIfNeeded(decodeTo = 'windows-1250') {
    let knownEncoding = null

    return new Transform({
        transform: (chunk, encoding, done) => {

            // get encoding on a first chunk
            if (!knownEncoding) {
                knownEncoding = chardet.detect(chunk)
            }

            // if we don't have encoding in allowed encodings, decode to encoding we want
            if (!allowedEncodings.has(knownEncoding.toLowerCase())) {
                chunk = iconv.decode(chunk, decodeTo)
            }

            // return decoded chunk if decode was needed, or just pass through if not needed
            done(null, chunk)
        },
    })
}
