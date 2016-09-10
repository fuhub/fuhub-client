/* eslint-disable no-unused-expressions */
import Client from '../src';
import { expect } from 'chai';

function makeClient() {
  return new Client({
    endpoint: 'http://localhost:3000',
  });
}

describe('Client', () => {
  it('could be created', () => {
    const client = makeClient();
    expect(client).to.be.ok;
  });
});
/* eslint-enable */
