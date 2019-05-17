
// Codeable Concepts, for now, is a utility library that understand the
// individual CCs and returns either React components, objects or strings
// for their values.
import { has } from 'lodash';

const v20131 = { // English only! There's a German version too!
  C: 'Emergency Contact',
  E: 'Employer',
  F: 'Federal Agency',
  I: 'Insurance Company',
  N: 'Next-of-Kin',
  S: 'State Agency',
  U: 'Unknown',
};

export function Relationship(relationship) {
  if (relationship === undefined || relationship.length === 0) {
    return '';
  }

  if (relationship.text !== undefined) {
    return relationship.text;
  }

  const label = [];
  for (let i = 0; i < relationship.length; i + 1) {
    console.log(relationship[i].coding[0]);
    let currentCode;
    if (has(relationship[i], 'coding[0].display')) { // Display check first.
      currentCode += `${relationship[i].coding[0].display}`;
    } else { // Display failed, check systems.
      switch (relationship[i].coding[0].system) {
        case 'http://terminology.hl7.org/CodeSystem/v2-0131':
          currentCode = `${v20131[relationship[i].coding[0].code]}`;
          break;
        case 'http://snomed.info/sct':
          currentCode = relationship[i].coding[0].code;
          break;
        case 'http://terminology.hl7.org/CodeSystem/v3-RoleCode':
          currentCode = relationship[i].coding[0].code.charAt(0) + relationship[i].coding[0].code.slice(1).toLowerCase();
          break;
        default:
          currentCode = relationship[i].coding[0].code;
      }
    }
    if (relationship[i].coding[0].code.userSelected) {
      return currentCode;
    }
    label.push(currentCode);
  }
  return label.join(', ');
}

export function maritalStatus(codeableConcept) {
  console.log(codeableConcept);
  console.log('Coming soon!');
}
