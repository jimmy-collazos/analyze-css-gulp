module.exports = {
  isObject,
  stringify
}

function isObject(obj){
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function stringify(obj, pretty = true){
  return pretty ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
}