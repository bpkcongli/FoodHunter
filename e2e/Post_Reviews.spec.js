const assert = require('assert');

Feature('Post Reviews');

Scenario('Post a review on Restaurant Detail Page', async ({I}) => {
  const testReviewerName = 'Congli~E2E Testing';
  const testReviewerText = 'test ngab';

  I.amOnPage('/');

  I.seeElement('.restaurant-item');
  I.click(locate({shadow: ['.restaurant-item:first-child', 'restaurant-name', 'a']}));

  I.seeElement({shadow: ['restaurant-review', 'input#reviewerNameInput']});
  I.seeElement({shadow: ['restaurant-review', 'textarea#reviewerTextInput']});
  I.seeElement({shadow: ['restaurant-review', '#postReviewButton']});

  I.fillField({shadow: ['restaurant-review', 'input#reviewerNameInput']}, testReviewerName);
  I.fillField({shadow: ['restaurant-review', 'textarea#reviewerTextInput']}, testReviewerText);

  I.click(locate({shadow: ['restaurant-review', '#postReviewButton']}));

  I.see('Your review has been added successfully', '.modal-content p');
  I.click('.modal');

  I.seeElement({shadow: ['restaurant-review', 'restaurant-review-item']});
  const reviewerNameRendered = await I.grabTextFrom(locate({shadow: ['restaurant-review', 'restaurant-review-item:last-child', '.restaurant-review-name']}));
  const reviewerDetailRendered = await I.grabTextFrom(locate({shadow: ['restaurant-review', 'restaurant-review-item:last-child', '.restaurant-review-detail']}));

  assert.strictEqual(reviewerNameRendered, testReviewerName);
  assert.strictEqual(reviewerDetailRendered, testReviewerText);
});
