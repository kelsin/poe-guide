'use strict';
const React = require('react');
const {Box, useInput} = require('ink');
const importJsx = require('import-jsx');

const {useData} = require('./hooks');
const Step = importJsx('./Step');
const Zone = importJsx('./Zone');

const App = ({poll}) => {
  const {act, step, current, next, prev, zone, nextAct, prevAct, nextStep, prevStep, firstStep, lastStep} = useData(poll);

  useInput((input, key) => {
    if (input === 'j') {
      nextStep();
    }
    if (input === 'k') {
      prevStep();
    }
    if (input === 'h') {
      prevAct();
    }
    if (input === 'l') {
      nextAct();
    }
    if (input === 'b') {
      firstStep();
    }
    if (input === 'e') {
      lastStep();
    }
    if (input === 'q') {
      process.exit(0);
    }
  });

  return (
    <Box flexDirection="column">
      <Zone zone={act, zone}/>
      <Box flexDirection="row" justifyContent="space-around">
        <Step step={prev} label="Previous"/>
        <Step step={current}/>
        <Step step={next} label="Next"/>
      </Box>
    </Box>
  );
};

module.exports = App;
