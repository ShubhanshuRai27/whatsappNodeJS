const metaRoutes = require("./meta.routes");

module.exports = function initializeRoute(app) {
  app.use("/api/meta", metaRoutes);
};