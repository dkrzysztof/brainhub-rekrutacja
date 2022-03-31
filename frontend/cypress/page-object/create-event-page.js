import { randomFromRange } from '../utils/random';

export class CreateEventPage {
	navigate() {
		cy.visit('http://localhost:3000');
	}

	// Validation
	validateValidationMessagesAbsence() {
		cy.get('div.ant-form-item-explain-error[role=alert]').should('not.exist');
	}

	validateValidationMessagesText(validationMessage) {
		cy.get('div.ant-form-item-explain-error[role=alert]').contains(validationMessage);
	}

	// ui methods
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
		cy.get('td.ant-picker-cell').eq(randomFromRange(42)).click();
	}

	getDatePickerColumn(i, cbWithin) {
		cy.get('ul.ant-picker-time-panel-column').eq(i).should('be.visible').within(cbWithin);
	}

	clickDatePickerOkButton() {
		cy.get('li.ant-picker-ok button').click();
	}
}
