import userService from "../services/user-service.js";

export const getClient = async (req, res, next) => {
  const { id } = req.params;
  // const dataUser = await userService.get(user);
  res.status(200).json(id);
};

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
