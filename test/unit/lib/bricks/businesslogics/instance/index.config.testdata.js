'use strict';

const config = {
  name: 'base-businesslogic',
  module: './bricks/businesslogics/instance/index.js',
  properties: {
    instanceApiUrl: 'http://localhost:3010/',
    schedulerApiUrl: 'http://localhost:3011/',
    jobManagerApiUrl: 'http://localhost:3012/',
  },
  publish: [],
  subscribe: [
    {
      topic: 'bl.base',
      data: [
        {},
      ],
    },
  ],
};

module.exports = config;