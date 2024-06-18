export function reduceDuplicates(array) {
  let counts = {};
  let reducedArray = [];

  array.forEach(function (obj) {
    let key = JSON.stringify(obj);

    if (counts[key]) {
      counts[key].count++;
    } else {
      counts[key] = { value: obj, count: 1 };
    }
  });

  for (let key in counts) {
    if (counts.hasOwnProperty(key)) {
      reducedArray.push(counts[key]);
    }
  }

  return reducedArray;
}
