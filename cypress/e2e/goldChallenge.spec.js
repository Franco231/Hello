/*Helpers*/

const getLeftSideBowl = (grid) => {
  return `left_${grid}`;
};

const getRightSideBowl = (grid) => {
  return `right_${grid}`;
};

const group1 = [0, 1, 2];
const group2 = [3, 4, 5];
const BOWL = "left_1";
const WEIGH_BUTTON = "weigh";
const RESET_BUTTON = "reset";

const foundLesserGold = (id) => `coin_${id}`;

const clickWeight = () => {
  cy.el(WEIGH_BUTTON).click();
  cy.wait(2000);
};

const splitFirstGroup = () => {
  group1.forEach((list) => {
    cy.el(getLeftSideBowl(list)).click().type(list);
  });
  group2.forEach((list) => {
    cy.el(getRightSideBowl(list)).click().type(list);
  });
  clickWeight();
};

const clearBowls = () => {
  group1.forEach((list) => {
    cy.el(getLeftSideBowl(list)).clear();
  });
  group2.forEach((list) => {
    cy.el(getRightSideBowl(list)).clear();
  });
};

const filterLesserGold = (gold1, gold2, gold3) => {
  cy.el(getLeftSideBowl(gold1)).click().type(gold1);
  cy.el(getRightSideBowl(gold2)).click().type(gold2);
  clickWeight();
  cy.get('[class="result"]').then((el) => {
    let result = el.text().slice(-1);
    if (result === "=") {
      cy.el(foundLesserGold(gold3)).click();
    } else if (result === ">") {
      cy.el(foundLesserGold(gold2)).click();
    } else {
      cy.el(foundLesserGold(gold1)).click();
    }
  });
};

const findLessGold = () => {
  splitFirstGroup();
  cy.get('[class="result"]').then((el) => {
    let text = el.text().slice(-1);
    clearBowls();
    if (text === "=") {
      filterLesserGold(6, 7, 8);
    } else if (text === "<") {
      filterLesserGold(1, 2, 3);
    } else {
      filterLesserGold(4, 5, 6);
    }
  });
};

describe("Fetch Coding Exercise ", () => {
  before(() => {
    cy.visit("http://sdetchallenge.fetch.com");
  });

  it("find gold that weight less", () => {
    cy.el(WEIGH_BUTTON).click();
    cy.el(RESET_BUTTON).eq(1).click();

    findLessGold();
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get('[class="result"]').then(() => {
      expect(stub.getCall(0)).to.be.calledWith("Yay! You find it!");
    });
  });
});
