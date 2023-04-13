import Client from "../models/client.js";
import { isNumeric } from "../utils/index.js";

const clientService = {};

clientService.get = async (clientId) => {
  const client = await Client.findById(clientId);
  if (!client) throw new Error("Client not found");
  return client;
};

clientService.searchClient = async ({ query = "", page = 1 }) => {
  const PAGE_SIZE = 10;
  if (!isNumeric(page)) page = 1;
  page = Number(page);

  const schema = Client.schema;
  const fields = Object.keys(schema.paths);

  let filters = [];
  if (query.length < 3 && query.length > 0)
    throw new Error("Search query should be at least 3 characters long");

  if (query.length >= 3) {
    filters = fields
      .filter((field) => schema.paths[field].instance === "String")
      .map((field) => ({ [field]: { $regex: query, $options: "i" } }));

    // Добавляем условия для поиска по телефону и вложенным полям в customfield
    filters.push({ phone: { $regex: query, $options: "i" } });
    filters.push({ "customfield.value": { $regex: query, $options: "i" } });
  }

  const totalClients = await Client.countDocuments(
    filters.length > 0 ? { $or: filters } : {}
  );
  const totalPages = Math.ceil(totalClients / PAGE_SIZE);
  const skip = (page - 1) * PAGE_SIZE;

  let clients = [];

  if (filters.length > 0) {
    clients = await Client.find({ $or: filters })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE);
  } else {
    clients = await Client.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE);
  }

  return { clients, page, totalPages, totalClients };
};

clientService.createClient = async ({ phone, firstName, ...rest }) => {
   
  const filter = { phone };
  let isNew = false;
  let client = await Client.findOne(filter);
  if (!client) {
    client = new Client({ phone, firstName, ...rest });
    await client.save();
    isNew = true;
  }
  return { client, isNew };
};


clientService.update = async ({ _id, ...rest }) => {
  const session = await Client.startSession();
  session.startTransaction();

  try {
    const filter = { _id };

    // Проверяем наличие поля, которое нужно обновить
    const validFields = Object.keys(rest).filter((field) =>
      Client.schema.paths.hasOwnProperty(field)
    );

    if (validFields.length === 0) {
      throw new Error("At least one valid field must be provided for update");
    }

    const update = { ...rest };
     if (update.hasOwnProperty('events')) {
      update.$addToSet = { events: update.events };
      delete update.events;
    }
    const client = await Client.findOneAndUpdate(filter, update, {
      new: true,
    }).session(session);
    if (!client) throw new Error("Client not found");

    await session.commitTransaction();
    session.endSession();

    return client;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};

clientService.checkAndCreate = async ({ phone, firstName }) => {
  const filter = { phone };
  let isNew = false;
  let client = await Client.findOne(filter);
  if (!client) {
    client = new Client({ phone, firstName });
    await client.save();
    isNew = true;
  }
  return { client, isNew };
};

clientService.addEvents = async ({ clientId, eventId }) => {
  const session = await Client.startSession();
  session.startTransaction();

  try {
    const filter = { _id: clientId };
    const update = { $addToSet: { events: eventId } };
    const options = { new: true };

    const client = await Client.findOneAndUpdate(
      filter,
      update,
      options
    ).session(session);
    if (!client) throw new Error("Client not found");

    await session.commitTransaction();
    session.endSession();

    return client.events;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};

clientService.delete = async (clientId) => {
  const deletedClient = await Client.findByIdAndRemove(clientId);
  if (!deletedClient) {
    throw new Error("Client not found");
  }
  return { deletedClient };
};
export default clientService;
