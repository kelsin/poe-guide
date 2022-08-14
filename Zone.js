'use strict';
const React = require('react');
const {Box, Text, Newline} = require('ink');

const Level = ({level}) => {
  let color = "green";
  if (level >= 69) {
    color = "red";
  } else if (level >= 45) {
    color = "yellow";
  }

  return <Text color={color}>{level}</Text>;
};

const tagLabel = tag => {
  switch (tag) {
  case "waypoint":
    return "WP";
  case "town":
    return "T";
  case "boss":
    return "B";
  case "trial":
    return "A";
  case "hideout":
    return "H";
  default:
    return "";
  }
}
const tagColor = tag => {
  switch (tag) {
  case "waypoint":
    return "blueBright";
  case "town":
    return "green";
  case "boss":
    return "red";
  case "trial":
    return "cyan";
  case "hideout":
    return "magenta";
  default:
    return "default";
  }
}


const Zone = ({zone, deaths}) => {
  const tags = zone.tags.map(tag => {
    return <Text key={tag} bold={true} color={tagColor(tag)}>{tagLabel(tag)} </Text>;
  });

  return (
    <Box flexDirection="column" marginBottom={1} borderStyle="round" borderColor="yellowBright">
      <Text>{zone.name} - <Text color="gray">lv</Text><Level level={zone.level}/><Text color="gray"></Text>{zone.tags.length > 0 ? " - " : null}{tags}</Text>
      <Text>Act <Text color="blueBright">{zone.act}</Text></Text>
      <Text>Deaths <Text color="red">{deaths}</Text></Text>
    </Box>
  );
};

module.exports = Zone;
