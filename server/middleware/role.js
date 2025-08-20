module.exports =
  (...allowed) =>
  (req, res, next) => {
    const r = (req.user?.role || "").toLowerCase();
    const norm = r === "user" ? "regular" : r;
    return allowed.includes(norm) ? next() : res.sendStatus(403);
  };
