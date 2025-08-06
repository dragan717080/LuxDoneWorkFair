/**
 * Converts kebab-case URL params to Pascal Case and replaces dash with space.
 * 
 * @param {string} input
 * 
 * @returns {string}
 */
const kebabToPascalCase = (input) => input
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');


/**
 * Converts Pascal Case URL params to kebab-case and replaces space with dash.
 * 
 * @param {string} input
 * 
 * @returns {string}
 */
const pascalToKebabCase = (input) => {
  return input
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
};


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
const hire = (e) => {
  e.preventDefault();

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


/**
 * Checks service name in URL params.
 *
 * @returns {string|void} - String if service name exists, otherwise just redirects to a different page.
 */
const checkServiceName = () => {
  const urlParams = new URLSearchParams(document.location.search);

  const serviceName = urlParams.get('service');

  if (!serviceName) {
    alert('This service is not available!');

    window.location.href = './index.html';
  }

  const serviceNameElement = document.getElementById('service-name');
  const newServiceName = kebabToPascalCase(serviceName);
  serviceNameElement.innerText = newServiceName;

  return newServiceName;
}

const hireBtn = document.getElementById('hire-btn');
hireBtn.addEventListener('click', (e) => {
  hire(e);
  const baseUrl = window.location.href.split('/').slice(0, -1).join('/') + '/';
  const urlParams = pascalToKebabCase(serviceName);
  let targetUrl = baseUrl + `processing.html?service=${urlParams}`;

  window.location.href = targetUrl;
});

var serviceName;

window.onload = () => {
  serviceName = checkServiceName();
}

