function isRequestAjaxOrApi(req) {
  return (
    !req.accepts("text/html") ||
    req.xhr ||
    req.accepts("application/json") ||
    req.accepts("text/plain")
  );
}

module.exports = {
  isRequestAjaxOrApi,
};
