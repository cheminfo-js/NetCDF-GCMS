'use strict';

const fs = require('fs');

const netcdfGcms = require('../src');

const pathFiles = `${__dirname}/files/`;

describe('Agilent format', () => {
  const data = fs.readFileSync(`${pathFiles}agilent-hplc.cdf`);
  it('Agilent HPLC file', () => {
    const json = netcdfGcms(data);
    expect(json.times).toHaveLength(4651);
    for (let i = 0; i < json.series.length; i++) {
      expect(json.series[i].data).toHaveLength(4651);
    }
  });

  it('fromAgilent HPLC', () => {
    const json = netcdfGcms.fromAgilentHPLC(data, { meta: true });
    console.log(json.meta);
    expect(json.times).toHaveLength(4651);
    for (let i = 0; i < json.series.length; i++) {
      expect(json.series[i].data).toHaveLength(4651);
    }
  });
});

describe.only('Agilent format - no actual_sampling_interval', () => {
  const data = fs.readFileSync(`${pathFiles}agilent-hplc2.cdf`);
  it('Agilent HPLC file', () => {
    const json = netcdfGcms(data, { meta: true });
    expect(json.times).toHaveLength(1645);
    for (let i = 0; i < json.series.length; i++) {
      expect(json.series[i].data).toHaveLength(1645);
    }
  });
});
