export const getErrorMessage = (error: Error) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return error.response?.data?.message;
};

export * from './browser';
export * from './styles';
export * from './dataFormat';
