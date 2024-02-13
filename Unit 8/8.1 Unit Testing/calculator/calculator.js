window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('calc-form');
  if (form) {
    setupIntialValues();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +document.getElementById('loan-amount').value,
    years: +document.getElementById('loan-years').value,
    rate: +document.getElementById('loan-rate').value,
  };
}

function setupIntialValues() {
  const initialValues = {
    amount: 11002,
    years: 20,
    rate: 12.3,
  };
  const amountField = document.getElementById('loan-amount');
  const yearsField = document.getElementById('loan-years');
  const rateField = document.getElementById('loan-rate');

  amountField.value = initialValues.amount;
  yearsField.value = initialValues.years;
  rateField.value = initialValues.rate;
  update();
}

function update() {
  const values = getCurrentUIValues();
  updateMonthly(values);
}

function calculateMonthlyPaymentBasedOn(values) {
  const principleAmount = values.amount;
  const monthlyInterestRate = values.rate / (100 * 12); //rate input was for yearly
  const numOfMonthlyPayments = values.years * 12;
  let calculatedMonthlyPayment = 0;

  //monthly payment formula
  calculatedMonthlyPayment =
    (principleAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numOfMonthlyPayments));

  //format monthly payment as string in USD
  const formatting = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  const monthlyPayment = new Intl.NumberFormat('en-US', formatting);
  const formattedMonthlyPaymentString = monthlyPayment.format(
    calculatedMonthlyPayment
  );

  return formattedMonthlyPaymentString;
}

function updateMonthly(values) {
  const monthly = calculateMonthlyPaymentBasedOn(values);
  const monthlyPaymentField = document.getElementById('monthly-payment');

  monthlyPaymentField.innerHTML = monthly;
}
