import express from "express";
import {
  createCurrency,
  deleteCurrencyById,
  getCurrencies,
  getCurrencyById,
  updateCurrencyById,
} from "../controllers/currency-controller.js";
import { tryWrapper } from "../utils/index.js";

const router = express.Router();

router.get("/", tryWrapper(getCurrencies));
router.get("/:id", tryWrapper(getCurrencyById));

router.post("/", tryWrapper(createCurrency));
router.put("/:id", tryWrapper(updateCurrencyById));
router.delete("/:id", tryWrapper(deleteCurrencyById));

export default router;
