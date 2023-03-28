import currenciesService from "../services/currency-service.js";

export const getCurrencies = async (req, res) => {
  try {
    const currencies = await currenciesService.getCurrencies();
    res.status(200).json(currencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrencyById = async (req, res) => {
  try {
    const currency = await currenciesService.getCurrencyById(req.params.id);
    if (currency) {
      res.status(200).json(currency);
    } else {
      res.status(404).json({ message: "Currency not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCurrency = async (req, res) => {
  try {
    const body = req.body;
    body.user = req.user;
    const currency = await currenciesService.createCurrency(body);
    res.status(201).json(currency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCurrencyById = async (req, res) => {
  try {
    const currency = await currenciesService.updateCurrencyById(
      req.params.id,
      req.body
    );
    if (currency) {
      res.status(200).json(currency);
    } else {
      res.status(404).json({ message: "Currency not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCurrencyById = async (req, res) => {
  try {
    const currency = await currenciesService.deleteCurrencyById(req.params.id);
    if (currency) {
      res.status(200).json(currency);
    } else {
      res.status(404).json({ message: "Currency not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
