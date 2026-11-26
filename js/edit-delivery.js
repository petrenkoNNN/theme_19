import { Delivery } from './delivery.js';

export const STATUSES = {
  delivery: 'Доставляется',
  delivered: 'Доставлен',
  canceled: 'Отменён'
};

const DEFAULT_STATUS = 'delivery';

export class EditDelivery extends Delivery {
  #status;
  #cardEl = null;

  constructor(name, address, distance, status = DEFAULT_STATUS) {
    super(name, address, distance);
    this.#status = Object.hasOwn(STATUSES, status) ? status : DEFAULT_STATUS;
  }

  get status() {
    return this.#status;
  }

  set status(value) {
    if (!Object.hasOwn(STATUSES, value)) return;

    this.#status = value;
    this.#applyStatus();
  }

  #applyStatus() {
    if (!this.#cardEl) return;

    Object.keys(STATUSES).forEach((key) => {
      this.#cardEl.classList.toggle(`delivery--${key}`, key === this.#status);
    });
  }

  #createEditButton() {
    const button = document.createElement('button');
    button.classList.add('delivery-edit');
    button.type = 'button';
    button.textContent = 'Изменить';

    button.addEventListener('click', () => {
      this.#cardEl.dispatchEvent(new CustomEvent('delivery-edit', {
        bubbles: true,
        detail: { delivery: this }
      }));
    });

    return button;
  }

  render() {
    const cardEl = super.render();

    if (!this.#cardEl) {
      this.#cardEl = cardEl;
      cardEl.append(this.#createEditButton());
      this.#applyStatus();
    }

    return cardEl;
  }
}
