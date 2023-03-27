import clientService from "../services/client-service.js";

export const getClient = async (req, res, next) => {
  const { id } = req.params;
  const data = await clientService.get(id);
  res.status(200).json(data);
};

export const searchClient = async (req, res, next) => {
  const { query, page } = req.query;
  const data = await clientService.searchClient({ query, page });
  res.status(200).json(data);
};
export const addClient = async (req, res, next) => {
  const { firstName, phone } = req.body;
  const { client, isNew } = await clientService.createClient({
    firstName,
    phone,
  });
  isNew ? res.status(201) : res.status(200);
  res.json(client);
};

export const updateClient = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const client = await clientService.update({ _id: id, ...body });
  res.status(200).json(client);
};
export const removeClient = async (req, res, next) => {
  const { id } = req.params;
  const { deletedClient } = await clientService.delete(id);
  res.status(200).json(deletedClient);
};

// export const onlineBooking = async (req, res, next) => {
//   const { firstName, phone } = req.body;
//   const data = await clientService.checkAndCreate({ firstName, phone });
//   res.status(201).json(data);
// };
