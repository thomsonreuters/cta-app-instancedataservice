'use strict';
const appRootPath = require('cta-common').root('cta-app-instancedataservice');
const chai = require('chai');
const expect = chai.expect;
const nodepath = require('path');

const Logger = require('cta-logger');
const Handler = require(nodepath.join(appRootPath,
  '/lib/utils/restapi/handlers/', 'instances.js'));

const DEFAULTLOGGER = new Logger();
const DEFAULTCEMENTHELPER = {
  constructor: {
    name: 'CementHelper',
  },
  brickName: 'restapi',
  logger: DEFAULTLOGGER,
  dependencies: {
  },
};

describe('Utils - RESTAPI - Handlers - Instances - constructor', function() {
  context('when everything ok', function() {
    let handler;
    before(function() {
      handler = new Handler(DEFAULTCEMENTHELPER);
    });
    it('should return a handler instance', function() {
      expect(handler).to.be.an.instanceof(Handler);
      expect(handler).to.have.property('cementHelper', DEFAULTCEMENTHELPER);
      expect(handler).to.have.property('dataType', 'instances');
    });
  });
});

