// 認証していない際にリダイレクトさせる
"use strict";

const requireAuth = (req, res, next) => {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    if (!isAuth) {
      const redirectUrl = '/signin?redirect=' + encodeURIComponent(req.originalUrl);
      res.redirect(redirectUrl);
    } else {
      next();
    }
};
  
module.exports = requireAuth;