'use strict';
const React = require('react');
const {Text} = require('ink');
const importJsx = require('import-jsx');

const {useData} = require('./hooks');
const Zone = importJsx('./Zone');


const App = ({}) => {
  const {location, current, zone} = useData();

  return (
      <>
        <Zone zone={zone}/>
        <Text>
          Location: <Text color="green">{location}</Text> <Text color="gray">({current})</Text>
        </Text>
      </>
  );
};

module.exports = App;
