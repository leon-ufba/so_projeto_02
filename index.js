const getReplaceIndex = (pages, frame, currIndex) => {
  let nextPages = pages.slice(currIndex);
  let positions = frame.map(f => nextPages.findIndex(p => p === f));
  let removeIndex = positions.findIndex(p => p === -1);
  if (removeIndex === -1) {
    let positionsMax = 0;
    positions.forEach((k, i) => {
      if (k > positionsMax) {
        positionsMax = k;
        removeIndex = i;
      }
    });
  }
  // console.log(frame, positions, removeIndex, frame[removeIndex]);
  return removeIndex;
}

const optimalPage = (pages, frameMaxSize) => {
  const frame = [];
  let hit = 0;
  pages.forEach((p, currIndex) => {
    if (frame.includes(p)) {
      hit++;
    } else {
      if (frame.length < frameMaxSize) {
        frame.push(p);
      } else {
        const replaceIndex = getReplaceIndex(pages, frame, currIndex);
        frame[replaceIndex] = p;
      }
    }
    console.log(frame);
  });
  return hit;
}

let pages = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
let frameMaxSize = 4;
let hit = optimalPage(pages, frameMaxSize);
console.log("No. of hits = " + hit);
console.log("No. of misses = " + (pages.length - hit));
