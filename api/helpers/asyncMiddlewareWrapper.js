export function asyncWrapper(handler) {
  return (req, res, next) => {
    handler(req, res).catch(next);
  };
}
