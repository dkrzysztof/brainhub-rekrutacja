import { randomFromRange } from '../utils/random';

export class CreateEventPage {
	navigate() {
		cy.visit('http://localhost:3000');
	}

	// Routing
	interceptCreateEvent(cb) {
		cy.intercept(
			{
				method: 'POST',
				url: 'api/events'
			},
			{ statusCode: 204 }
		)
			.as('createEvent')
			.then(cb);
	}

	interceptCreateEventError(cb, errorResponse) {
		cy.intercept(
			{
				method: 'POST',
				url: 'api/events'
			},
			errorResponse
		)
			.as('error')
			.then(cb);
	}

	// Notification
	validateNotificationSuccessMessagePresence(message) {
		cy.get('.ant-message-notice-content').should('contain.text', message);
	}

	validateNotificationErrorMessagePresence(message, description) {
		cy.get('.ant-notification-notice-message').should('contain.text', message);
		if (description) {
			description.forEach((descriptionItem) => {
				cy.get('.ant-notification-notice-description').should('contain.text', descriptionItem);
			});
		}
	}

	// Validation
	validateValidationMessagesAbsence() {
		cy.get('div.ant-form-item-explain-error[role=alert]').should('not.exist');
	}

	validateValidationMessagesText(validationMessage) {
		cy.get('div.ant-form-item-explain-error[role=alert]').contains(validationMessage);
	}

	// UI methods
	checkHeaderTextPresence() {
		cy.get('.app-header span.brainhub-font').should('contain.text', 'Brainhub');
	}

	checkInputPresence() {
		cy.get('.app-container')
			.should('be.visible')
			.within(() => {
				this.getFirstnameInput().should('be.visible');
				this.getLastnameInput().should('be.visible');
				this.getEmailInput().should('be.visible');
				this.getDateInput().should('be.visible');
				this.getSubmitButton().should('be.visible');
			});
	}

	// Firstname input
	typeFirstname(firstname) {
		this.getFirstnameInput().type(firstname);
	}

	getFirstnameInput() {
		return cy.get('input#firstname');
	}

	// Lastname input
	typeLastname(lastname) {
		this.getLastnameInput().type(lastname);
	}

	getLastnameInput() {
		return cy.get('input#lastname');
	}

	// Email input
	typeEmail(email) {
		this.getEmailInput().clear().type(email);
	}

	getEmailInput() {
		return cy.get('input#email');
	}

	// Submit button
	clickSubmit() {
		this.getSubmitButton().click();
	}

	getSubmitButton() {
		return cy.get('button[type=submit]');
	}

	// DatePicker methods
	typeRandomDate() {
		this.openDatePicker();
		this.getDatePicker(() => {
			this.chooseRandomDay();
			this.getDatePickerColumn(0, () => {
				cy.get('li.ant-picker-time-panel-cell').eq(randomFromRange(24)).click();
			});
			this.getDatePickerColumn(1, () => {
				cy.get('li.ant-picker-time-panel-cell').eq(randomFromRange(60)).click();
			});
			this.getDatePickerColumn(2, () => {
				cy.get('li.ant-picker-time-panel-cell').eq(randomFromRange(60)).click();
			});

			cy.get('li.ant-picker-ok').within(() => {
				cy.get('button').click();
			});
		});
	}

	openDatePicker() {
		this.getDateInput().click();
	}

	getDateInput() {
		return cy.get('input#date');
	}

	getDatePicker(cbWithin) {
		cy.get('div.ant-picker-dropdown').should('be.visible').within(cbWithin);
	}

	chooseRandomDay() {
		cy.get('td.ant-picker-cell.ant-picker-cell-in-view').eq(randomFromRange(28)).click();
	}

	getDatePickerColumn(i, cbWithin) {
		cy.get('ul.ant-picker-time-panel-column').eq(i).should('be.visible').within(cbWithin);
	}

	clickDatePickerOkButton() {
		cy.get('li.ant-picker-ok button').click();
	}
}
