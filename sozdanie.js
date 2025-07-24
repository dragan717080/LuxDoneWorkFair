/**
 * Disallow overflow in number input.
 *
 * @param {HTMLInputElement} inputElement - Input with `type=number`.
 * @param {number} maxValue - Max allowed value.
 * @param {number} [minValue] - Min allowed value. Defaults to 1.
 *
 * @returns {void}
 */
const controlNumberInput = (
  inputElement,
  maxValue,
  minValue = 1
) => {
  const inputValue = parseInt(inputElement.value);

  if (inputValue > maxValue) {
    inputElement.value = maxValue;
  } else if (inputValue < minValue) {
    inputElement.value = minValue;
  }
}


/**
 * Checks whether the selected start time is not after end time.
 *
 * @returns {Array<number>|false} - Array of start and end time if it is correctly selected, otherwise false.
 */
const checkHoursAndMinutes = () => {
  const selectedStartHour = parseInt(document.querySelector("select[name='hour-start']").value);
  const selectedEndHour = parseInt(document.querySelector("select[name='hour-end']").value);
  const selectedStartMinute = parseInt(document.querySelector("select[name='minute-start']").value);
  const selectedEndMinute = parseInt(document.querySelector("select[name='minute-end']").value);

  const selectedTimeError = document.getElementById('select-time-error');

  const hourStartIsBigger = selectedStartHour > selectedEndHour;
  const hoursAreSame = selectedStartHour === selectedEndHour;
  const minuteStartSameOrEqual = selectedStartMinute >= selectedEndMinute;

  // TO DO: Check that the worker works at least 1 hour
  // TO DO: Check that the days in months are ok (e.g. not more than days in that month)

  if (hourStartIsBigger || hoursAreSame && minuteStartSameOrEqual) {
    selectedTimeError.classList.remove('hidden');

    return false;
  } else {
    selectedTimeError.classList.add('hidden');

    return [
      selectedStartHour,
      selectedStartMinute,
      selectedEndHour,
      selectedEndMinute
    ];
  }
}


/**
 * @param {PointerEvent<HTMLButtonElement>} e
 *
 * @returns {boolean}
 */
const requestMaster = (e) => {
  e.preventDefault();

  const requestMasterName = document.querySelector("input[name='nazvanie']").value;
  console.log(requestMasterName);

  const requestErrorElement = document.getElementById('request-name-error');

  if (!requestMasterName) {
    requestErrorElement.classList.remove('hidden');
  } else {
    requestErrorElement.classList.add('hidden');
  }

  const address = document.querySelector("input[name='address']").value;
  console.log(address);

  const addressErrorElement = document.getElementById('address-error');

  if (!address) {
    addressErrorElement.classList.remove('hidden');
  } else {
    addressErrorElement.classList.add('hidden');
  }

  const cost = parseInt(document.querySelector("input[name='stoimost']").value);
  console.log('cost:', cost);

  const selectedTime = checkHoursAndMinutes();

  const selectTimeErrorElement = document.getElementById('select-time-error');
  if (!selectedTime) {
    selectTimeErrorElement.classList.remove('hidden');
  } else {
    selectTimeErrorElement.classList.add('hidden');
  }

  const details = document.querySelector("textarea[name='details']").value;
  console.log('details:', details);

  const detailsErrorElement = document.getElementById('details-error');

  if (!details) {
    detailsErrorElement.classList.remove('hidden');
  } else {
    detailsErrorElement.classList.add('hidden');
  }

  return true;
}


const requestMasterBtn = document.getElementById('sozdanie-btn');
requestMasterBtn.addEventListener('click', (e) => requestMaster(e));

const costInputElement = document.querySelector("input[name='stoimost']");
console.log(costInputElement);
costInputElement.addEventListener('input', () => controlNumberInput(costInputElement, 1000));
