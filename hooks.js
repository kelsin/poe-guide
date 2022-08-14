const {useEffect, useState} = require('react');
const config = require('./config');
const Tail = require('tail').Tail;

const {zones} = require('./data/zones.3.18.json');
const {acts} = require('./data/steps.3.18.json');

const getZone = (location, act) => {
  for (let i=0; i<zones.length; i++) {
    const zone = zones[i];

    if (zone.name === location && zone.act === act) {
      return zone;
    }
  }

  throw `Couldn't find a zone for Act ${act}: ${location}`;
};

const checkMovement = (act, step, location) => {
  // Grab current data
  const currentAct = acts[act - 1];
  const currentStep = currentAct.steps[step];

  // Check next
  let checkAct = act;
  let checkStep = step + 1;

  // Are we done with the act?
  if (checkStep === currentAct.steps.length) {
    checkAct = act + 1;
    checkStep = 0;
  }

  if ((checkAct - 1) < acts.length) {
    // Check next
    let nextStep = acts[checkAct - 1].steps[checkStep];
    if (nextStep.zone === location) {
      // Found it, move here
      return { act: checkAct, step: checkStep };
    };
  }

  // Check prev
  checkAct = act;
  checkStep = step - 1;

  if (checkStep < 0 && act === 1) {
    // Just stay at the beginning
    return { act: 1, step: 0 };
  }

  if (checkStep < 0) {
    checkAct = act - 1;
    checkStep = acts[checkAct - 1].steps.length - 1;
  }
  let prevStep = acts[checkAct - 1].steps[checkStep];
  if (prevStep.zone === location) {
    return { act: checkAct, step: checkStep };
  }

  // Stay where we are
  return { act, step };
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

const getNextStep = (act, step) => {
  let nextStep = getStep(act, step + 1);

  if (!nextStep) {
    return getStep(act + 1, 0);
  }

  return nextStep;
};

const getPrevStep = (act, step) => {
  if (step > 0) {
    return getStep(act, step - 1);
  }

  if (act === 1) {
    return null;
  }

  let currentAct = acts[act - 2];
  return getStep(act - 1, currentAct.steps.length - 1);
};

const getStep = (act, step) => {
  if (act < 1 || act > acts.length) {
    return null;
  }

  let currentAct = acts[act - 1];
  if (step < 0 || step >= currentAct.steps.length) {
    return null;
  }

  return {
    act,
    step,
    ...currentAct.steps[step]
  };
};

const getData = (location, act, step) => {
  current = getStep(act, step);
  return {
    location,
    act,
    step,
    prev: getPrevStep(act, step),
    current: current,
    next: getNextStep(act, step),
    zone: getZone(current.zone, current.act || act)
  };
};

const initialData = getData(zones[0].name, 1, 0);

const useData = (polling = false) => {
  const [data, setData] = useState(initialData);

  const firstStep = () => {
    setData(getData(data.location, 1, 0));
  };

  const lastStep = () => {
    setData(getData(data.location, 11, 0));
  };

  const prevAct = () => {
    if (data.act === 1) return;

    setData(getData(data.location, data.act - 1, 0));
  };

  const nextAct = () => {
    if (data.act === acts.length) return;

    setData(getData(data.location, data.act + 1, 0));
  };

  const nextStep = () => {
    if (data.step + 1 === acts[data.act - 1].steps.length) {
      // we're at the end of the act
      nextAct();
      return;
    }

    setData(getData(data.location, data.act, data.step + 1));
  };

  const prevStep = () => {
    if (data.step === 0) {
      if (data.act === 1) return;

      setData(getData(data.location, data.act - 1, acts[data.act - 2].steps.length - 1));
      return;
    };

    setData(getData(data.location, data.act, data.step - 1));
  };

  useEffect(() => {
    registerHandler("location", /.*You have entered (.*)./, (matches) => {
      const location = matches[1];
      const movement = checkMovement(data.act, data.step, location);

      if (movement.act !== data.act || movement.step !== data.step) {
        setData(getData(location, movement.act, movement.step));
      }
    });

    const tail = new Tail(config.get('log'), {useWatchFile:polling, fsWatchOptions:{interval: 1000}});
    tail.on("line", lineHandler);
    tail.on("error", errorHandler);

    return () => {
      tail.unwatch();
      for (const key in handlers) {
        delete handlers[key];
      }
    };
  });

  return {
    ...data,
    nextAct,
    prevAct,
    nextStep,
    prevStep,
    firstStep,
    lastStep
  }
};

exports.useData = useData;
exports.getZone = getZone;
