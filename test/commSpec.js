/* eslint-disable no-unused-expressions */
import Client from '../src';
import { expect } from 'chai';
require('chai').should(); // inject should

function makeClient() {
  return new Client({
    endpoint: 'http://localhost:3000',
  });
}

describe('with comm api', () => {
  it('I can create channel', () => {
    const client = makeClient();
    const result = client.channels.create({
      owner: 'admin', // TODO auto resolve owner_id on server
      name: 'test',
    });
    result.should.be.fulfilled;
  });
});
/* eslint-enable */
