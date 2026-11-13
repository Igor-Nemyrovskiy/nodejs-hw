import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const isHttpError = err instanceof HttpError;
  const status = isHttpError ? err.status : 500;
  const message =
    isHttpError && err.expose ? err.message : 'Internal Server Error';

  res.status(status).json({
    message,
  });
};
