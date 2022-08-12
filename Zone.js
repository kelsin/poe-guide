'use strict';
const React = require('react');
const {Text} = require('ink');

const Zone = ({zone}) => {
  return (
      <>
      <Text>Zone: {zone.name}</Text>
      <Text>Act: {zone.act} Level: {zone.level}</Text>
      <Text></Text>
      </>
  );
};

module.exports = Zone;
