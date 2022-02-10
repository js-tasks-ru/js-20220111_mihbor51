export default class NotificationMessage {
  static notifacationIsActive = false

  element

  constructor (message = '', {
    duration = 2000,
    type = 'success'
  } = {}) {
    this.type = type;
    this.message = message;
    this.duration = duration;

    this.renderedTemplate();
  }

  get template() {
    return `<div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
   </div>`;
  }

  renderedTemplate() {
    const element = document.createElement('div');
    
    element.innerHTML = this.template;
    
    this.element = element.firstElementChild;
  }

  show() {
    if (!NotificationMessage.notifacationIsActive) {
      NotificationMessage.notifacationIsActive = true;

      document.body.append(this.element);
      this.timerId = setTimeout(() => this.remove(), this.duration);
    }
  }

  remove() {
    clearTimeout(this.timerId);
    if (this.element) {
      this.element.remove();
    }
    NotificationMessage.notifacationIsActive = false;
  }

  destroy() {
    this.remove();
    this.element = null;
    NotificationMessage.notifacationIsActive = false;
  }
}
