'use strict';

const o = require('../common');
let child;

before(function(done) {
  this.timeout(5000);
  // TODO provide mongodb cta-oss dev server
  const logFile = o.path.resolve(o.os.tmpDir(), 'cta-app-instancedataservice-main.log');
  o.mongoClient.connect('mongodb://localhost:27017/oss', function(cnErr, db) {
    if (cnErr) {
      done(cnErr);
    } else {
      db.dropDatabase(function(dbErr) {
        if (dbErr) {
          done(dbErr);
        } else {
          db.close();
          child = new (o.forever.Monitor)(o.app, {
            max: 0,
            silent: true,
            logFile: logFile,
            outFile: logFile,
            errFile: logFile,
          });
          child.on('start', function() {
            console.log(`*** forever started
            \nSee log files in:
            \n${child.logFile}
            \n${child.outFile}
            \n${child.errFile}`);
            setTimeout(done, 2000);
          });
          child.start();
        }
      });
    }
  });
});

after(function(done) {
  this.timeout(3000);
  child.on('stop', function() {
    console.log('\n*** forever stopped');
    setTimeout(done, 2000);
  });
  child.stop();
});
