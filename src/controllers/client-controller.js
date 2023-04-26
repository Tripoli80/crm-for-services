import clientService from "../services/client-service.js";

export const addClient = async (req, res, next) => {
  const body = req.body;
  const { user } = req;
  
  const { client, isNew } = await clientService.createClient({user,
    ...body,
  });
  isNew ? res.status(201) : res.status(200);
  res.json(client);
};

export const getClient = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  const data = await clientService.get({ id,user });
  res.status(200).json(data);
};

export const updateClient = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  const body = req.body;
  const client = await clientService.update({ _id: id, user, ...body });
  res.status(200).json(client);
};
export const removeClient = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  const { deletedClient } = await clientService.delete({ id, user });
  res.status(200).json(deletedClient);
};

export const searchClient = async (req, res, next) => {
  const { query, page } = req.query;
  const { user } = req;
  const data = await clientService.searchClient({ query, page, user});
  res.status(200).json(data);
};



// export const onlineBooking = async (req, res, next) => {
//   const { firstName, phone } = req.body;
//   const data = await clientService.checkAndCreate({ firstName, phone });
//   res.status(201).json(data);
// };
