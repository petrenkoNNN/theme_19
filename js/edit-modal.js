import { STATUSES } from './edit-delivery.js';

const FIELDS = ['name', 'address', 'distance', 'status'];

const validators = {
  name: { validate: (value) => value.trim() !== '', message: 'Введите имя' },
  address: { validate: (value) => value.trim() !== '', message: 'Введите адрес' },
  distance: {
    validate: (value) => value.trim() !== '' && +value >= 0,
    message: 'Расстояние должно быть числом'
  }
};

const modal = document.querySelector('.modal');
const form = modal.querySelector('.modal-form');
const errorEl = modal.querySelector('.modal-error');
const statusSelect = modal.querySelector('.modal-status');

let currentDelivery = null;

const getField = (name) => form.querySelector(`[name="${name}"]`);

const closeModal = () => {
  modal.classList.remove('modal--open');
  currentDelivery = null;
};

export const openEditModal = (delivery) => {
  currentDelivery = delivery;
  errorEl.textContent = '';

  FIELDS.forEach((name) => {
    getField(name).value = delivery[name];
  });

  modal.classList.add('modal--open');
};

const findInvalidField = (formData) => Object.entries(validators)
  .find(([name, { validate }]) => !validate(formData.get(name) ?? ''));

const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const invalidField = findInvalidField(formData);

  if (invalidField) {
    const [name, { message }] = invalidField;
    errorEl.textContent = message;
    getField(name).focus();
    return;
  }

  const { name, address, distance, status } = Object.fromEntries(formData);
  Object.assign(currentDelivery, { name: name.trim(), address: address.trim(), distance, status });

  closeModal();
};

statusSelect.append(...Object.entries(STATUSES).map(([value, label]) => new Option(label, value)));

form.addEventListener('submit', handleSubmit);
modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});
