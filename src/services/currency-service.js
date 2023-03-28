import Currency from "../models/currency.js";

const currenciesService = {};

currenciesService.getCurrencies = async () => {
  const currencies = await Currency.find();
  return currencies;
};

currenciesService.getCurrencyById = async (id) => {
  const currency = await Currency.findById(id);
  return currency;
};

currenciesService.createCurrency = async ({ titel, code, rate, user }) => {
  const isPresent = await Currency.findOne({ user, code });
  if (isPresent) throw new Error("Currency alredy present");
  const currency = new Currency({ titel, code, rate, user });
  await currency.save();
  return currency;
};

currenciesService.updateCurrencyById = async (id, currencyData) => {
  const currency = await Currency.findByIdAndUpdate(id, currencyData, {
    new: true,
  });
  return currency;
};

currenciesService.deleteCurrencyById = async (id) => {
  const currency = await Currency.findByIdAndDelete(id);
  return currency;
};

export default currenciesService;
