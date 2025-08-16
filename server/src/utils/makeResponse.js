export function ok(res, data = {}, message = 'OK') {
  return res.json({ success: true, message, data });
}
export function fail(res, status = 400, message = 'Bad Request', data = {}) {
  return res.status(status).json({ success: false, message, data });
}
