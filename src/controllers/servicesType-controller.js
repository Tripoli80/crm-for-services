import express from "express";
import * as servicesTypeService from "../services/servicesType-service.js";

export const addServicesType = async (req, res) => {
  const { body, user } = req;
  const payload = { ...body, user };
  const serviceType = await servicesTypeService.add(payload);
  res.status(200).json(serviceType);
};

export const getServicesTypes = async (req, res) => {
  const servicesTypes = await servicesTypeService.getAll();
  res.status(200).json({servicesTypes});
};

export const getServiceTypeById = async (req, res) => {
  const serviceType = await servicesTypeService.getById(req.params.id);
  res.status(200).json(serviceType);
};

export const updateServiceType = async (req, res) => {
  const updatedServiceType = await servicesTypeService.update(
    req.params.id,
    req.body
  );
  res.status(200).json(updatedServiceType);
};

export const deleteServiceType = async (req, res) => {
  await servicesTypeService.remove(req.params.id);
  res.status(200).json({ message: "Service type deleted successfully" });
};
