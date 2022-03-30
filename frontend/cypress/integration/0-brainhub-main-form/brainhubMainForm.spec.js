describe('Brainhub Recrution task Main Form ', () => {
	const randomFromRange = (n) => {
		return Math.floor(Math.random() * n);
	};

	const cyGetRandomDateFromDatePicker = () => {
		cy.get('div.ant-picker-dropdown')
			.should('be.visible')
			.within(() => {
				cy.get('td.ant-picker-cell').eq(randomFromRange(42)).click();
				cy.get('ul.ant-picker-time-panel-column')
					.eq(0)
					.should('be.visible')
					.within(() => {
						cy.get('li.ant-picker-time-panel-cell').eq(randomFromRange(24)).click();
					});
				cy.get('ul.ant-picker-time-panel-column')
					.eq(1)
					.should('be.visible')
					.within(() => {
						cy.get('li.ant-picker-time-panel-cell').eq(randomFromRange(60)).click();
					});
				cy.get('ul.ant-picker-time-panel-column')
					.eq(2)
					.should('be.visible')
					.within(() => {
						cy.get('li.ant-picker-time-panel-cell').eq(randomFromRange(60)).click();
					});
				cy.get('li.ant-picker-ok').within(() => {
					cy.get('button').click();
				});
			});
	};

	beforeEach(() => {
		cy.visit('http://localhost:3000/');
	});

	it('loads successfully', () => {
		cy.get('.app-header')
			.should('be.visible')
			.within(() => {
				cy.get('span.brainhub-font').should('contain.text', 'Brainhub');
			});

		cy.get('.app-container')
			.should('be.visible')
			.within(() => {
				cy.get('input#firstname').should('be.visible');
				cy.get('input#lastname').should('be.visible');
				cy.get('input#email').should('be.visible');
				cy.get('input#date').should('be.visible');
				cy.get('button[type=submit]').should('be.visible');
			});

		cy.get('div.ant-message div.ant-message-notice').should('not.exist');
	});

	it('should display validation messages on empty fields', () => {
		cy.get('button[type=submit]').click();
		cy.get('div.ant-form-item-explain-error[role=alert]').should('have.length', 4);
		cy.get('div.ant-form-item-explain-error[role=alert]').contains('Firstname is required!');
		cy.get('div.ant-form-item-explain-error[role=alert]').contains('Lastname is required!');
		cy.get('div.ant-form-item-explain-error[role=alert]').contains('Email is required!');
		cy.get('div.ant-form-item-explain-error[role=alert]').contains('Event date is required!');
	});

	it('should not display validation messages on non-empty fields', () => {
		cy.get('.app-container')
			.should('be.visible')
			.within(() => {
				cy.get('input#firstname').type('Jan');
				cy.get('input#lastname').type('Kowalski');
				cy.get('input#email').type('jkowalski@email.com');
				cy.get('input#date').click();
			});

		cyGetRandomDateFromDatePicker();

		cy.get('button[type=submit]').click();
		cy.get('div.ant-form-item-explain-error[role=alert]').should('not.exist');
	});

	it('should not allow incorrect email', () => {
		cy.get('input#email').should('be.visible');
		cy.get('input#email').type('jkowalski@email.com');
		cy.get('div.ant-form-item-explain-error[role=alert]').should('not.exist');

		const testEmailValue = (value) => {
			cy.get('input#email').clear();
			cy.get('input#email').type(value);
			cy.get('div.ant-form-item-explain-error[role=alert]').should('have.length', 1);
			cy.get('div.ant-form-item-explain-error[role=alert]').contains('Email is not a valid email!');
		};

		const incorrectEmails = ['jkowalski', 'jkowalski@', 'jkowalski@mail', 'jkowalski@mail.', 'jkowalski@mail,com'];
		incorrectEmails.forEach(testEmailValue);
	});
});
