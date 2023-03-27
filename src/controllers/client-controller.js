import clientService from "../services/client-service.js";

export const getClient = async (req, res, next) => {
  const { id } = req.params;
  const data = await clientService.get(id);
  res.status(200).json(data);
};

export const searchClient = async (req, res, next) => {
  console.log("🚀 ~ file: client-controller.js:11 ~ query:")
  const { query, page } = req.query;
  const data = await clientService.searchClient({ query, page });
  res.status(200).json(data);
};
// export const onlineBooking = async (req, res, next) => {
//   const { firstName, phone } = req.body;
//   const data = await clientService.checkAndCreate({ firstName, phone });
//   res.status(201).json(data);
// };
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
// {
//   _id,
//   firstName,
//   lastName,
//   email,
//   age,
//   description,
//   address,
//   dateOfBirth,
//   gender,
//   phone,
//   customfield,
// }

// export const updateUser = async (req, res, next) => {
//   const { user } = req;
//   const { email, name, age, description, phone, customfield } = req.body;
//   const data = { _id: user, email, name, age, description, phone, customfield };

//   const updatedUser = await userService.update(data);
//   res.status(201).json(updatedUser);
// };

// export const deleteUser = async (req, res, next) => {
//   const { user } = req;
//   const removedUser = await userService.delete(user);
//   if (removedUser)
//     res.status(200).json({ message: "Successfully removed", removedUser });
// };

// export const changePassword = async (req, res, next) => {
//   const { user } = req;
//   const { password, newPassword } = req.body;
//   const data = { id: user, password, newPassword };

//   const updatedUser = await userService.changePassword(data);
//   if (updatedUser) res.status(200).json({ updatedUser });
// };
