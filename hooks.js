const {useEffect, useState} = require('react');
const config = require('./config');
const Tail = require('tail').Tail;

const {zones} = require('./data/zones.3.18.json');

const lookupZone = (current, location) => {
  // Search forward
  for (let i=current; i<zones.length; i++) {
    const zone = zones[i];

    if (zone.name === location) {
      return i;
    }
  }

  // Search backward
  for (let i=(current-1); i>=0; i--) {
    const zone = zones[i];

    if (zone.name === location) {
      return i;
    }
  }

  return current;
};

const handlers = {};

const registerHandler = (name, re, func) => {
	handlers[name] = { name, re, func };
};

const lineHandler = data => {
  for (const name in handlers) {
    const handler = handlers[name];
    const match = data.match(handler.re);

    if (match) {
      handler.func(match);
    }
  }
};

const errorHandler = error => {
  console.log('ERROR: ', error);
};

const useData = () => {
  const [data, setData] = useState({
    location: zones[0].name,
    current: 0,
    zone: zones[0]
  });

  useEffect(() => {
    registerHandler("location", /.*You have entered (.*)./, (matches) => {
      const location = matches[1];
      const current = lookupZone(data.current, location);
      const zone = zones[current];

      setData({ location, current, zone });
    });

    const tail = new Tail(config.get('log'));
    tail.on("line", lineHandler);
    tail.on("error", errorHandler);

    return () => {
      tail.unwatch();
      for (const key in handlers) {
        delete handlers[key];
      }
    };
  });

  return data;
};

exports.useData = useData;
