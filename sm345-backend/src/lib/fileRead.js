require('dotenv').config();
const { MONGO_URI: mongoURI } = process.env;

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

module.exports = function(id) {
    Grid.mongo = mongoose.mongo;
    let conn = mongoose.createConnection(mongoURI);

    return new Promise( (resolve, reject) => {
            conn.once('open', () => {
                let gfs = Grid(conn.db);

                let readstream = gfs.createReadStream({
                    _id: id
                });

                let buffer
                readstream.on('data', chunk => buffer = chunk);
                
                readstream.on('close', () => resolve(buffer));
            });
        }
    );
};
