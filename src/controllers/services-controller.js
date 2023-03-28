import Service from "../models/service.js";
import * as servicesService from "../services/services-service.js";

export const addService = async (req, res) => {
  const { body, user } = req;
  const payload = { ...body, user };
  const services = await servicesService.add(payload);
  res.status(200).json(services);
};

export const getServices = async (req, res) => {
  const { user } = req;

  const services = await servicesService.getAll({ user });
  res.status(200).json(services);
};

export const getServiceById = async (req, res) => {
  const {
    user,
    params: { id },
  } = req;
  const payload = { user, id };
  const service = await servicesService.getById(payload);
  res.status(200).json(service);
};

export const updateService = async (req, res) => {
  const {
    body,
    user,
    params: { id },
  } = req;
  const payload = { body, user, id };

  const updatedService = await servicesService.update(payload);
  if (!updatedService) throw new Error("Service not found");

  res.status(200).json(updatedService);
};

export const deleteService = async (req, res) => {
  const remmovedService = await servicesService.remove(req.params.id);
  if (!remmovedService) throw new Error("Service not found");

  res
    .status(200)
    .json({ message: "Service deleted successfully", remmovedService });
};
