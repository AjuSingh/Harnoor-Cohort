let value = 1;
function _setInterval(duration) {
  setTimeout(() => {
    console.log(value);
    value++;
    _setInterval(duration);
  }, duration);
}
_setInterval(1000);
