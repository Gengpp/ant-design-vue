function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [10, 40, 100, 3, 80, 20];
      break;

    default:
      res = null;
      break;
  }
  return res;
}

module.exports = chart;
