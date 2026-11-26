import { EditDelivery } from './edit-delivery.js';
import { openEditModal } from './edit-modal.js';

const deliveryArr = [
  new EditDelivery('Ольга', 'ул. Вымыслов, д. 12', 8),
  new EditDelivery('Дмитрий', 'ул. Задачная, д. 7', 3, 'delivered'),
  new EditDelivery('Оля', 'ул. Ткачей, д. 43', 11, 'canceled')
];

const container = document.querySelector('.deliveries');
const totalButton = document.querySelector('.total-button');
const totalResult = document.querySelector('.total-result');

deliveryArr.forEach((delivery) => container.append(delivery.render()));

container.addEventListener('delivery-edit', ({ detail }) => openEditModal(detail.delivery));

totalButton.addEventListener('click', () => {
  const totalDistance = EditDelivery.getTotalDistance(deliveryArr);

  totalResult.textContent = `Общее расстояние: ${totalDistance} км`;
});
