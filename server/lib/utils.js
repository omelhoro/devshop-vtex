export function errorHandler(err) {
  console.error(err);
  this.status = 500;
  this.send();
}
