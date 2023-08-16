/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import { addDays, addWeeks, Day, firstDayInWeek, firstDayOfMonth, lastDayOfMonth } from "@progress/kendo-date-math";

// https://twitter.com/jamesqquick/status/1599781686879072256
const letters = ["a", "b", "c", "a", "c", "c"];

const counts = letters.reduce((memo, letter) => {
  memo[letter] = memo[letter] ?? 0;
  memo[letter] += 1;
  return memo;
}, {});
console.log({ counts }); // { a: 2, b: 1, c: 3 }

const groupCount = (state, item) => {
  state[item] = (state[item] || 0) + 1
  return state
}
const lettersToCount = letters.reduce(groupCount, {})
console.log(lettersToCount)


const views = [
  { name: "day", title: "Day", },
  { name: "week", title: "Week", workWeekStart: Day.Monday },
  { name: "month", title: "Month" },
]

// console.log(views.map(({ name, title, workWeekStart }) => {
//   const start = workWeekStart ? firstDayInWeek(new Date(), workWeekStart) : firstDayOfMonth(new Date());
//   const end = lastDayOfMonth(new Date());
//   return {
//     name,
//     title,
//     start,
//     end,
//   }
// }))

// ---

const arr1 = [
	{ name: 'Joe Brown', goals: 0, assists: 0, points: 0 },
	{ name: 'Jim Bob', goals: 2, assists: 1, points: 3 },
	{ name: 'Harry Styles', goals: 1, assists: 1, points: 2 },
	{ name: 'Craig Mack', goals: 5, assists: 7, points: 12 },
	{ name: 'Wés BÔS 🔥', goals: 5, assists: 7, points: 12 },
	{ name: 'DOG', bones: 100000, goals: 5, assists: 7, points: 12 }
];

// prettier-ignore
const arr2 = [
  { name: 'Craig Mack', goals: 3, assists: 3, points: 6, ppg: 0, ppa: 0, pims: 0, },
  { name: 'Jim Bob', goals: 1, assists: 4, points: 5, ppg: 0, ppa: 1, pims: 0 },
  { name: 'Joe Brown', goals: 0, assists: 0, points: 0, ppg: 0, ppa: 0, pims: 0, },
  { name: 'Harry Styles', goals: 0, assists: 0, points: 0, ppg: 0, ppa: 0, pims: 0, },
];

function addItUp(...arraysOfData) {
	const data = arraysOfData.flat();
	const tally = data.reduce(function (tallyArray, item) {
		// first check if this person is new
		const { name, ...points } = item;
		console.log(`Working on ${name}`);
		console.log(points);
		tallyArray[name] = tallyArray[name] || {};
		// Loop over each of their properties and add them up
		Object.entries(points).forEach(([key, val]) => {
			if (tallyArray[name][key]) {
				// Already exists, so we increment the value by the next line
				tallyArray[name][key] = tallyArray[name][key] + val;
			} else {
				// brand new, set it to that value!
				tallyArray[name][key] = val;
			}
		});
		return tallyArray;
	}, {});
	return tally;
}

const arraysOfObjectsReducer = (...arraysOfObjs) => {
	return arraysOfObjs.flat().reduce((acc, obj) => {
		const { name, ...rest } = obj;
		acc[name] = acc[name] || {};
		Object.entries(rest).forEach(([key, value]) => {
			acc[name][key] = (acc[name][key] || 0) + value;
		});
		return acc;
	}, {});
};

function addItUp2(...arraysOfData) {
	return arraysOfData.flat().reduce((prev, next) => {
		const matchIndex = prev.findIndex((i) => i.name === next.name);
		if (matchIndex === -1) {
			prev.push(next);
		} else {
			const match = prev[matchIndex];
			Object.entries(next).forEach(([key, value]) => {
				if (match[key] && key !== 'name') {
					match[key] = match[key] + value;
				} else {
					match[key] = value;
				}
			});
		}

		return prev;
	}, []);
}

// console.log([...arr1, arr2].flat())

// const result = addItUp(arr1, arr2);
const result = addItUp2(arr1, arr2);
// const result = arraysOfObjectsReducer(arr1, arr2);
console.table(result);

// return Object.values(feedFormats).map(({file, type}) => ({
// 	path: `${baseLinkFeedArticles}/${file}`,
// 	type,
// 	create: createFeedArticles,
// }))
// let array = [{ id: 1, initials: 'ABC'}, {id: 2, initials: 'DEF'}, {id: 2, initials: 'DEF'}, {id: 3, initials: ''}];
// let uniqueArray = array.filter((obj, index, self) => obj.initials && self.findIndex(t => t.id === obj.id) === index);
// console.log(uniqueArray);
let array = [{ id: 1, initials: 'ABC'}, {id: 2, initials: 'DEF'}, {id: 2, initials: 'DEF'}, {id: 3, initials: ''}];
let uniqueArray = array.filter((obj, index, self) => obj.initials && self.findIndex(t => t.id === obj.id && t.initials === obj.initials) === index);
console.log(uniqueArray);
