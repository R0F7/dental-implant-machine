const percentage = (achieved, target) =>
  target ? ((achieved / target) * 100).toFixed(2) : 0;

export default percentage;
