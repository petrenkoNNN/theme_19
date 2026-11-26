const DISTANCE_UNIT = 'км';

export class Delivery {
  #name;
  #address;
  #distance;
  #isHighlighted = false;
  #el = null;
  #valueEls = {};

  constructor(name, address, distance) {
    this.#name = name;
    this.#address = address;
    this.#distance = +distance;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
    this.#updateText('name');
  }

  get address() {
    return this.#address;
  }

  set address(value) {
    this.#address = value;
    this.#updateText('address');
  }

  get distance() {
    return this.#distance;
  }

  set distance(value) {
    this.#distance = +value;
    this.#updateText('distance');
  }

  get isHighlighted() {
    return this.#isHighlighted;
  }

  set isHighlighted(value) {
    this.#isHighlighted = Boolean(value);
    this.#el?.classList.toggle('delivery--highlighted', this.#isHighlighted);
  }

  get #texts() {
    return {
      name: this.#name,
      address: this.#address,
      distance: `${this.#distance} ${DISTANCE_UNIT}`
    };
  }

  #updateText(key) {
    const valueEl = this.#valueEls[key];

    if (valueEl) {
      valueEl.textContent = this.#texts[key];
    }
  }

  #createField(key, label) {
    const field = document.createElement('div');
    field.classList.add('delivery-field');

    const labelEl = document.createElement('div');
    labelEl.classList.add('delivery-label');
    labelEl.textContent = label;

    const valueEl = document.createElement('div');
    valueEl.classList.add('delivery-value');
    valueEl.textContent = this.#texts[key];

    this.#valueEls[key] = valueEl;
    field.append(labelEl, valueEl);

    return field;
  }

  render() {
    if (!this.#el) {
      this.#el = document.createElement('div');
      this.#el.classList.add('delivery');
      this.#el.classList.toggle('delivery--highlighted', this.#isHighlighted);

      this.#el.append(
        this.#createField('name', 'Имя'),
        this.#createField('address', 'Адрес'),
        this.#createField('distance', 'Расстояние')
      );
    }

    return this.#el;
  }
}
