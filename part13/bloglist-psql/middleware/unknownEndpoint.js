export const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
