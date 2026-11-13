import createHttpError from 'http-errors';

const { HttpError } = createHttpError;

export const errorHandler = (err, req, res, next) => {
  const status = err instanceof HttpError ? err.status : 500;

  console.error(err);

  res.status(status).json({
    message: err.message,
  });
};
