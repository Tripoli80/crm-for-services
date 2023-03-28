import Service from "../models/service.js";
import * as servicesService from "../services/services-service.js";

export const addService = async (req, res) => {
  const { body, user } = req;
  const payload = { ...body, user };
  const services = await servicesService.add(payload);
  res.status(200).json(services);
};

export const getServices = async (req, res) => {
  const services = await servicesService.getAll();
  res.status(200).json(services);
};

export const getServiceById = async (req, res) => {
  const service = await servicesService.getById(req.params.id);
  res.status(200).json(service);
};

export const updateService = async (req, res) => {
  const updatedService = await servicesService.update(req.params.id, req.body);
  res.status(200).json(updatedService);
};

export const deleteService = async (req, res) => {
  await servicesService.remove(req.params.id);
  res.status(200).json({ message: "Service deleted successfully" });
};
