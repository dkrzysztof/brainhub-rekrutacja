import { CreateEventPage } from '../page-object/create-event-page';

describe('Brainhub Recruitment task Main Form ', () => {
	const createEventPage = new CreateEventPage();

	beforeEach(() => {
		createEventPage.navigate();
	});

	it('loads successfully', () => {
		createEventPage.checkHeaderTextPresence();
		createEventPage.checkInputPresence();
	});

	it('should display validation messages on empty fields', () => {
		createEventPage.clickSubmit();

		createEventPage.validateValidationMessagesText('Firstname is required!');
		createEventPage.validateValidationMessagesText('Lastname is required!');
		createEventPage.validateValidationMessagesText('Email is required!');
		createEventPage.validateValidationMessagesText('Event date is required!');
	});

	it('should not display validation messages on non-empty fields', () => {
		createEventPage.typeFirstname('Jan');
		createEventPage.typeLastname('Kowalski');
		createEventPage.typeEmail('jkowalski@email.com');
		createEventPage.typeRandomDate();

		createEventPage.clickSubmit();
		createEventPage.validateValidationMessagesAbsence();
	});

	it('should not allow incorrect email', () => {
		createEventPage.typeEmail('jkowalski@email.com');
		createEventPage.validateValidationMessagesAbsence();

		const incorrectEmails = ['jkowalski', 'jkowalski@', 'jkowalski@mail', 'jkowalski@mail.', 'jkowalski@mail,com'];

		const testEmailValue = (value) => {
			createEventPage.typeEmail(value);
			createEventPage.validateValidationMessagesText('Email is not a valid email!');
		};

		incorrectEmails.forEach(testEmailValue);
	});

	it('should return notifiaction upon successful creation', () => {
		createEventPage.typeFirstname('Jan');
		createEventPage.typeLastname('Kowalski');
		createEventPage.typeEmail('jkowalski@email.com');
		createEventPage.typeRandomDate();

		createEventPage.interceptCreateEvent(() => {});
		createEventPage.clickSubmit();

		createEventPage.validateNotificationSuccessMessagePresence('Successfully created event!');
		cy.wait(500);
	});

	it('should return notifiaction upon 500 error creation', () => {
		createEventPage.typeFirstname('Jan');
		createEventPage.typeLastname('Kowalski');
		createEventPage.typeEmail('jkowalski@email.com');
		createEventPage.typeRandomDate();

		createEventPage.interceptCreateEventError(() => {}, { statusCode: 500 });
		createEventPage.clickSubmit();

		createEventPage.validateNotificationErrorMessagePresence('The app has encountered an error :(');
		cy.wait(500);
	});

	it('should return notifiaction upon 404 error creation', () => {
		createEventPage.typeFirstname('Jan');
		createEventPage.typeLastname('Kowalski');
		createEventPage.typeEmail('jkowalski@email.com');
		createEventPage.typeRandomDate();

		createEventPage.interceptCreateEventError(() => {}, { statusCode: 404 });

		createEventPage.clickSubmit();

		createEventPage.validateNotificationErrorMessagePresence("Server couldn't resolve given endpoint");
		cy.wait(500);
	});

	it('should return notifiaction upon 400 error creation', () => {
		createEventPage.typeFirstname('Jan');
		createEventPage.typeLastname('Kowalski');
		createEventPage.typeEmail('jkowalski@email.com');
		createEventPage.typeRandomDate();

		createEventPage.interceptCreateEventError(() => {}, {
			statusCode: 400,
			body: {
				statusCode: 400,
				message: ['email must be an email', 'firstname is required'],
				error: 'Bad Request'
			}
		});

		createEventPage.clickSubmit();

		createEventPage.validateNotificationErrorMessagePresence(
			'Your request did not pass validation. The following data needs correction:',
			['email must be an email', 'firstname is required']
		);
	});
});
