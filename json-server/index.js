const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);


// Custom middleware
server.use((req, res, next) => {
  if (req.originalUrl.includes('_page')) {
    const totalTransactions = router.db.get('transactions').value().length;
    router.render = function (req, res) {
      const pageSize = Number(req.originalUrl.slice(req.originalUrl.indexOf('&_limit=') + 8));
      const pageQueryBegining = req.originalUrl.indexOf('=') + 1;
      const pageQueryEnding = req.originalUrl.indexOf('&_limit');
      const pageNumber = Number(req.originalUrl.slice(pageQueryBegining, pageQueryEnding));
      res.jsonp({
        results: res.locals.data,
        page: pageNumber,
        pageSize: pageSize,
        totalPages: Math.ceil(totalTransactions / pageSize),
        totalElements: totalTransactions
      });
    };
  } else {
    router.render = function (req, res) {
      res.jsonp(res.locals.data);
    };
  }
  next();
});

server.use(router);

server.listen(process.env.PORT || 3000, () => {
  console.log("JSON Server is running");
});