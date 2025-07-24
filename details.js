/**
 * Checks whether any pay option is selected, and returns it if it is.
 *
 * @returns {string | undefined}
 */
const checkPayOptionIsActive = () => {
  // If neither pay option is selected, raise an error
  const paypalContainer = document.getElementById('paypal-container');
  const cashContainer = document.getElementById('cash-container');

  const payElements = [paypalContainer, cashContainer];

  const isAnyPayOptionActive = payElements.find(payElement => payElement.style.backgroundColor === 'rgb(225, 89, 44)' || cashContainer.style.backgroundColor === 'rgb(225, 89, 44)');

  const selectPayErrorElement = document.getElementById('select-pay-error');
  console.log('isAnyPayOptionActive:', isAnyPayOptionActive);
  if (!isAnyPayOptionActive) {
    selectPayErrorElement.classList.remove('hidden');

    return false;
  } else {
    selectPayErrorElement.classList.add('hidden');
    return isAnyPayOptionActive.innerText;
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

  const selectedPayOption = checkPayOptionIsActive();
  const selectedTime = checkHoursAndMinutes();

  if (!selectedPayOption || !selectedTime) {
    return false;
  }
}

/**
 * Only keep background for the currently active input option, and remove from others.
 * @param {Array<HTMLDivElement>} allOptions
 * @param {HTMLDivElement} activeElement
 * @return {void}
 */
const onlyGiveBackgroundToCurrentlyActiveInput = (
  allOptions,
  activeElement
) => {
  console.log('activeElement:', activeElement);
  const otherElements = allOptions.toSpliced(allOptions.indexOf(activeElement), 1);
  console.log(otherElements);

  // Give orange background to active element
  activeElement.style.backgroundColor = '#E1592C';
  activeElement.style.border = '1px solid #FFF';
  activeElement.style.color = '#FFF';
  // However, don't change the color on `select`
  Array.from(activeElement.getElementsByTagName('select')).forEach(selectElement => {
    selectElement.style.color = '#9C9C9C';
  });

  // Give default to other elements
  otherElements.forEach(otherElement => {
    otherElement.style.backgroundColor = '#F5F5F5';
    otherElement.style.border = '1px solid #CDCDCD';
    otherElement.style.color = '#9C9C9C';
  });
}


const addListenersForPaypalAndCash = () => {
  const dateAndTimeOptions = [
    document.getElementById('date-container'),
    document.getElementById('time-container'),
  ];

  dateAndTimeOptions.forEach((activeElement) =>
    activeElement.addEventListener('click', () => onlyGiveBackgroundToCurrentlyActiveInput(dateAndTimeOptions, activeElement))
  );

  const payOptions = [
    document.getElementById('paypal-container'),
    document.getElementById('cash-container')
  ];

  payOptions.forEach((activeElement) => {
    // Remove the `select pay option` error as soon as any option is selected
    const selectPayErrorElement = document.getElementById('select-pay-error');

    selectPayErrorElement.classList.add('hidden');
    activeElement.addEventListener('click', () => onlyGiveBackgroundToCurrentlyActiveInput(payOptions, activeElement))
  }
  );
}

const hireBtn = document.getElementById('hire-btn');
hireBtn.addEventListener('click', (e) => hire(e));

addListenersForPaypalAndCash();
