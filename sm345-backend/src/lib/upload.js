require('dotenv').config();
const { MONGO_URI: mongoURI } = process.env;

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

module.exports = function(file, aliases) {
    let { data, name, mimetype } = file;

    Grid.mongo = mongoose.mongo;
    let conn = mongoose.createConnection(mongoURI);

    return new Promise( (resolve, reject) => {
            conn.once('open', () => {
                let gfs = Grid(conn.db);
                let writestream = gfs.createWriteStream({
                    filename: name,
                    mode: 'w',
                    content_type: mimetype,
                    aliases: aliases
                });
                
                writestream.on('close', file => resolve(file));
                
                writestream.write(data);
                writestream.end();
            });
        }
    );
};
