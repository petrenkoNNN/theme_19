import { Delivery } from './delivery.js';

const FAR_DISTANCE = 10;

const deliveryArr = [
  new Delivery('Ольга', 'ул. Вымыслов, д. 12', 8),
  new Delivery('Дмитрий', 'ул. Задачная, д. 7', 3),
  new Delivery('Оля', 'ул. Ткачей, д. 43', 11)
];

const container = document.querySelector('.deliveries');

deliveryArr.forEach((delivery) => {
  delivery.isHighlighted = delivery.distance > FAR_DISTANCE;
  container.append(delivery.render());
});
