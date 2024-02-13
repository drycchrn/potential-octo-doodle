it('should calculate the monthly payment correctly', function () {
  const values = {
    amount: 25000,
    years: 4,
    rate: 3.2,
  };
  expect(calculateMonthlyPaymentBasedOn(values)).toEqual('$555.57');
});

it('should return a result with 2 decimal places', function () {
  const values = {
    amount: 100034,
    years: 10,
    rate: 21,
  };
  expect(calculateMonthlyPaymentBasedOn(values)).toEqual('$2,000.00');
});

it('should handle high interest rates', function () {
  const values = {
    amount: 10000,
    years: 5,
    rate: 99.9,
  };
  expect(calculateMonthlyPaymentBasedOn(values)).toEqual('$839.42');
});
