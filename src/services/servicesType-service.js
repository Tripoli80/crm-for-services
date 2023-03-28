import ServiceType from "../models/serviceType.js";
export const add = async (serviceData) => {
  const existingService = await ServiceType.findOne({
    title: serviceData.title,
    user: serviceData.user,
  });

  if (existingService) {
    throw new Error(
      `Service with this title "${serviceData.title}" already exists for this user`
    );
  }

  // Если услуги с таким названием нет, создаем новую услугу
  const serviceType = new ServiceType(serviceData);
  return await serviceType.save();
};

export const getAll = async () => {
  const serviceTypes = await ServiceType.find().populate("user");
  return serviceTypes;
};

export const getById = async (id) => {
  return await ServiceType.findById(id).populate("user");
};

export const update = async (id, serviceTypeData) => {
  return await ServiceType.findByIdAndUpdate(id, serviceTypeData, {
    new: true,
    runValidators: true,
  });
};

export const remove = async (id) => {
  return await ServiceType.findByIdAndDelete(id);
};
