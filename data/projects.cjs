const { faker } = require('@faker-js/faker')
const _ = require('lodash')

export const projects = _.times(100, (n) => {
  const CreatedOn = faker.date.past(2)
  const Customer = faker.name.fullName()

  return {
    Id: n + 1,
    IsActive: faker.helpers.arrayElement([0, 1]),
    ProjectNumber: faker.datatype.uuid(),
    ClaimNumber: faker.datatype.uuid(),
    Customer,
    Avatar: faker.image.avatar(),
    LossPhoneNumber: faker.phone.number(),
    Email: faker.internet.email(Customer),
    ProjectStatus: faker.helpers.arrayElement([
      'Call Queue',
      'Assigned',
      'Confirmed',
      'Working',
      'Review',
      'Complete',
      'Billed',
      'Closed',
      'Pending',
      'Schedule',
      'Triage',
    ]),
    CreatedOn,
    ServiceTech: faker.helpers.arrayElement(['pending', 'complete']),
    InsuranceCompany: faker.helpers.arrayElement([
      'Esurance',
      'Encompass',
      'California State Auto Association',
      'Liberty Mutual',
    ]),
    InsuranceAdjuster: faker.helpers.arrayElement(['David Edwards', 'complete']),
    Address: faker.address.streetAddress(),
    City: faker.address.city(),
    State: faker.address.stateAbbr(),
    PostalCode: faker.address.zipCode(),
    ServiceArea: faker.helpers.arrayElement(['DC Metro', 'complete']),
    ServiceRegion: faker.helpers.arrayElement(['Mid-Atlantic', 'complete']),
    RegionLead: faker.helpers.arrayElement(['pending', 'complete']),
    ServiceType: faker.helpers.arrayElement([
      'Direct Inspect',
      'Virtual Inspect',
      'Emergency Tarp',
      'Estimate',
      'Ladder Assist',
    ]),
    ProviderId: faker.datatype.uuid(),
    LastSeen: faker.date.between(CreatedOn, new Date()),
    RequiresHAAG: 0,
  }
})

// "PastDueNotComplete": 1226817,
// "PastDueComplete": 1226757,
// "IsToday": 1226880,
// "IsTomorrow": 1228320,
// "IsRecentClosed": 1226880,
// "IsRecentCreated": 1226880,
// "AssignableId": 0,
// "Assignable": "",
// "CreatedBy": "NHA",
// "ReadBySvt": 35649,
// "IsReinspect": "0",
// "AdjusterProjectNumber": 280,
// "IsEscalation": "1",
// "IsReschedule": null
