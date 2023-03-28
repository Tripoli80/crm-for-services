import Service from "../models/service.js";

export const add = async (serviceData) => {
  const existingService = await Service.findOne({
    title: serviceData.title,
    user: serviceData.user,
  });

  if (existingService) {
    throw new Error(
      `Service with this title "${serviceData.title}" already exists for this user`
    );
  }

  // Если услуги с таким названием нет, создаем новую услугу
  const service = new Service(serviceData);
  return await service.save();
};

export const getAll = async () => {
  const resCurrencyField = "titel rate code";
  const resUserField = "name phone email";
  const resServiceTypeField = ''

  return await Service.find()
    .populate("user", resUserField)
    .populate("serviceType", resServiceTypeField)
    .populate("price.currency", resCurrencyField);
};

export const getById = async (id) => {
  return await Service.findById(id)
    .populate("user")
    .populate("serviceType")
    .populate("price.currency");
};

export const update = async (id, serviceData) => {
  return await Service.findByIdAndUpdate(id, serviceData, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id) => {
  return await Service.findByIdAndDelete(id);
};
