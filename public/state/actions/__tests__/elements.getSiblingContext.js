import expect from 'expect.js';
import { getSiblingContext } from '../elements';

const state = {
  transient: {
    resolvedArgs: {
      'element-foo': {
        expressionContext: {
          '0': {
            state: 'ready',
            value: {
              type: 'datatable',
              columns: [
                { name: 'project', type: 'string' },
                { name: 'cost', type: 'string' },
                { name: 'age', type: 'string' },
              ],
              rows: [
                { project: 'pandas', cost: '500', age: '18' },
                { project: 'tigers', cost: '200', age: '12' },
              ],
            },
            error: null,
          },
          '1': {
            state: 'ready',
            value: {
              type: 'datatable',
              columns: [
                { name: 'project', type: 'string' },
                { name: 'cost', type: 'string' },
                { name: 'age', type: 'string' },
              ],
              rows: [
                { project: 'tigers', cost: '200', age: '12' },
                { project: 'pandas', cost: '500', age: '18' },
              ],
            },
            error: null,
          },
          '2': {
            state: 'ready',
            value: {
              type: 'pointseries',
              columns: {
                x: { type: 'string', role: 'dimension', expression: 'cost' },
                y: { type: 'string', role: 'dimension', expression: 'project' },
                color: { type: 'string', role: 'dimension', expression: 'project' },
              },
              rows: [
                { x: '200', y: 'tigers', color: 'tigers' },
                { x: '500', y: 'pandas', color: 'pandas' },
              ],
            },
            error: null,
          },
        },
      },
    },
  },
};

describe('actions/elements getSiblingContext', () => {
  it('should find context when a previous context value is found', () => {
    // pointseries map
    expect(getSiblingContext(state, 'element-foo', 2)).to.eql({
      index: 2,
      context: {
        type: 'pointseries',
        columns: {
          x: { type: 'string', role: 'dimension', expression: 'cost' },
          y: { type: 'string', role: 'dimension', expression: 'project' },
          color: { type: 'string', role: 'dimension', expression: 'project' },
        },
        rows: [
          { x: '200', y: 'tigers', color: 'tigers' },
          { x: '500', y: 'pandas', color: 'pandas' },
        ],
      },
    });
  });

  it('should find context when a previous context value is not found', () => {
    // pointseries map
    expect(getSiblingContext(state, 'element-foo', 1000)).to.eql({
      index: 2,
      context: {
        type: 'pointseries',
        columns: {
          x: { type: 'string', role: 'dimension', expression: 'cost' },
          y: { type: 'string', role: 'dimension', expression: 'project' },
          color: { type: 'string', role: 'dimension', expression: 'project' },
        },
        rows: [
          { x: '200', y: 'tigers', color: 'tigers' },
          { x: '500', y: 'pandas', color: 'pandas' },
        ],
      },
    });
  });
});
