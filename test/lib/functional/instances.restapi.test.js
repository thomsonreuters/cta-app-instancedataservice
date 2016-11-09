'use strict';

const o = require('../common');

const url = 'http://localhost:3000/instances';

describe('instances restapi', function() {

  let child;

  before(function(done) {
    this.timeout(5000);
    const file = o.path.resolve(__dirname, '..', '..', '..', 'lib', 'index.js');
    child = new(o.forever.Monitor)(file, {
      max: 0,
      silent: true,
      logFile: o.path.resolve(o.os.tmpDir(), 'cta-app-instancedataservice-main.log'),
      outFile: o.path.resolve(o.os.tmpDir(), 'cta-app-instancedataservice-out.log'),
      errFile: o.path.resolve(o.os.tmpDir(), 'cta-app-instancedataservice-err.log'),
    });
    child.on('start', function() {
      setTimeout(done, 2000);
    });
    child.start();
  });

  after(function(done) {
    this.timeout(3000);
    child.on('stop', function() {
      done();
    });
    child.stop();
  });

  const doc = {
    hostname: 'foo.com',
    ip: '12.34.56.78',
  };
  it('create instance', (done) => {
    o.superagent.post(url)
      .send(doc)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          o.assert(res.body.id);
          doc.id = res.body.id;
          o.assert.strictEqual(res.body.hostname, doc.hostname);
          o.assert.strictEqual(res.body.ip, doc.ip);
          done();
        }
      });
  });
  it('get instance', (done) => {
    o.superagent.get(url + '?id=' + doc.id)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          o.assert.strictEqual(res.body[0].id, doc.id);
          o.assert.strictEqual(res.body[0].hostname, doc.hostname);
          o.assert.strictEqual(res.body[0].ip, doc.ip);
          done();
        }
      });
  });
});
