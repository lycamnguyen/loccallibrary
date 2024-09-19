import { Request, Response, NextFunction } from "express";

interface CustomResponse extends Response {
  setLocale: (locale: string) => void;
}

const setLocaleMiddleware = (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  const lang = typeof req.query.lang === "string" ? req.query.lang : "en";

  res.setLocale = (locale: string) => {
    req.i18n.changeLanguage(locale);
  };

  res.setLocale(lang);
  next();
};

export default setLocaleMiddleware;
