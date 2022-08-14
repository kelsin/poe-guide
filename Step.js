'use strict';
const React = require('react');
const {Box, Newline, Text, Spacer} = require('ink');

const {acts} = require('./data/steps.3.18.json');

const Step = ({step, label}) => {
  let borderStyle = "round";
  let borderColor = "gray";
  let color="gray";
  let actLabelNode = null;
  if (!step) {
    borderStyle = undefined
  } else {
    actLabelNode = (
      <Box flexDirection="row-reverse" paddingX={2}>
        <Text><Text color={label ? "gray" : "blueBright"}>{step.act}</Text><Text color="gray">.</Text><Text color={label ? "gray" : "whiteBright"}>{step.step}</Text></Text>
      </Box>
    );
  }

  if (!label) {
    color="whiteBright";
    borderColor = "blue";
  }

  let stepNode = null;
  if (step) {
    let areaNode = null;
    let bossesNode = null;
    let rewardsNode = null;
    let wpNode = null;
    let goNode = null;
    let notesNode = null;

    if (step && step.area) {
      areaNode = <Text color={color}><Text color="magenta">↓</Text> Find the <Text color="magenta">{step.area}</Text></Text>;
    }

    if (step && step.bosses) {
      bossesNode = step.bosses.map(boss => {
        return <Text color={color} key={boss}><Text color="red">✕</Text> Kill <Text color="red">{boss}</Text></Text>;
      });
    }

    if (step && step.rewards) {
      rewardsNode = step.rewards.map(npc => {
        return <Text color={color} key={npc}><Text color="yellow">$</Text> Talk to <Text color="yellow">{npc}</Text> for a reward</Text>;
      });
    }

    if (step && step.waypoint) {
      wpNode = <Text color={color}><Text color="blue">◎</Text> Grab the <Text color="blue">waypoint</Text></Text>;
    }

    if (step && step.port) {
      goNode = <Text color={color}><Text color="blue">→</Text> Waypoint to <Text color="green">{step.port}</Text></Text>;
    }

    if (step && step.travel) {
      goNode = <Text color={color}><Text color="green">→</Text> Travel to <Text color="green">{step.travel}</Text></Text>;
    }

    if (step && step.sail) {
      goNode = <Text color={color}><Text color="blueBright">→</Text> Sail to <Text color="greenBright">{step.travel}</Text></Text>;
    }

    if (step && step.tp) {
      goNode = <Text color={color}><Text color="blue">←</Text> Town Portal or Logout</Text>;
    }

    if (step && step.note) {
      notesNode = <Text color={color} italic={true}>  {step.note}</Text>;
    }

    stepNode = (
      <>
        <Text color={color}>{step.zone}</Text>
        {wpNode}
        {areaNode}
        {bossesNode}
        {rewardsNode}
        {notesNode}
        {goNode}
      </>
    );
  }

  return (
    <Box width="33%" flexDirection="column">
      <Box borderColor={borderColor} borderStyle={borderStyle} paddingRight={1} marginRight={2} flexDirection="column">
        {stepNode}
      </Box>
      {actLabelNode}
    </Box>
  );
};

module.exports = Step;
