'use strict';

const moment = require('moment');
const miio = require('miio');

const MI_DEVICE_IP = '127.0.0.1';

const log = message => console.log(`${moment().format('DD MMM, HH:mm:ss')} | ${message}`);

miio
  .device({ address: MI_DEVICE_IP, cacheTime: 300 })
  .then(device => {

    if (!device.hasCapability('temperature')) {
      log(`this mi device does not have temperature sensor.`);
      device.destroy();
      return;
    }

    log(device.temperature.toFixed(1));

    device.on('propertyChanged', e => {
      if (e.property === 'temperature') {
        log(e.value.toFixed(1));
      }
    });

  })
  .catch(console.error);
