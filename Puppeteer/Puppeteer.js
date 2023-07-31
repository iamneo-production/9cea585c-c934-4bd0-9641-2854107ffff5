const puppeteer = require('puppeteer');
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function buyerLogin() {
    const browser = await puppeteer.launch(
        {
            headless : false,
            defaultViewport : false,
            slowMo:20,
        }
    )
    const page = await browser.newPage();

    await page.goto("https://8081-afaadedbcdddcfcdcebdafbeaeaadbdbabf.project.examly.io//#/Home"); 

    await page.screenshot({path:'home.png'});
    
    //Buyer Register
    const loginAndRegister = await page.waitForXPath("//button[contains(text(), 'Login/Register')]");
    await  loginAndRegister.click();

    const continueAsBuyer = await page.waitForXPath("//button[contains(text(), 'Continue as Buyer')]");
    await continueAsBuyer.click();

    const buyerSignUp = await page.waitForXPath("//button[contains(text(), 'Sign up')]");
    await buyerSignUp.click();

    await page.waitForSelector('input[name="name"]');
    await page.type('input[name="name"]', 'Sample');
    
    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', "sample32@gmail.com");

    await page.waitForSelector('input[name="phone"]');
    await page.type('input[name="phone"]', "8939812792");

    await page.waitForSelector('input[name="password"]');
    await page.type('input[name="password"]', "Sample@32");

    await page.waitForSelector('textarea[name="address"]');
    await page.type('textarea[name="address"]', "Chennai");

    const buyerSignUpSubmit = await page.waitForXPath("//button[contains(text(), 'Sign Up')]");
    await buyerSignUpSubmit.click();

    page.on('dialog', async (dialog) => {
        console.log('Alert Message:', dialog.message()); // Get the alert message
        await dialog.accept(); // Click "OK" on the alert
    });

    //Buyer Login
    const loginAndRegisters = await page.waitForXPath("//button[contains(text(), 'Login/Register')]");
    await  loginAndRegisters.click();
    const continueAsBuyers = await page.waitForXPath("//button[contains(text(), 'Continue as Buyer')]");
    await continueAsBuyers.click();

    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', "sample32@gmail.com");

    await page.waitForSelector('input[name="password"]');
    await page.type('input[name="password"]', "Sample@32");

    const buyerSignInSubmit = await page.waitForXPath("//button[contains(text(), 'Sign In')]");
    await buyerSignInSubmit.click();

    //Nav to About Us Page
    const aboutUs = await page.waitForXPath("//a[contains(text(), 'About Us')]");
    await aboutUs.click();

    //Nav to Contact Us Page
    const contactUs = await page.waitForXPath("//a[contains(text(), 'Contact Us')]");
    await contactUs.click();

    //Contact Form Filling
    await page.waitForSelector("input[name = 'name']");
    await page.type("input[name='name']", "Magi");

    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', "demouser@gmail.com");

    await page.waitForSelector('input[name="phoneNumber"]');
    await page.type('input[name="phoneNumber"]', "8939812792");

    await page.waitForSelector('input[name="subject"]');
    await page.type('input[name="subject"]', "Query Issue 1");

    await page.waitForSelector('textarea[name="description"]');
    await page.type('textarea[name="description"]', "Query Issue 1");

    const querySubmit = await page.waitForXPath("//button[contains(text(), 'Submit')]");
    await querySubmit.click();

    await delay(3500);

    //Nav to Help Center Page
    const helpCenter = await page.waitForXPath("//a[contains(text(), 'Help Center')]");
    await helpCenter.click();

    //Nav to FAQ Page
    const faq = await page.waitForSelector("#faq")
    await faq.click();

    //Nav to Favourites Page
    await page.waitForSelector('.bfavourites');
    await page.click('.bfavourites');

    //Profile Opening
    await page.waitForSelector('.bprofile');
    await page.click('.bprofile');

    //Profile Page
    const myProfiles = await page.waitForXPath("//a[contains(text(), 'My Profile')]");
    await myProfiles.click();

    const account = await page.waitForXPath("//a[contains(text(), 'Account')]");
    await account.click();

    // new changes from archana
    await page.evaluate(() => {
        const buttons = document.querySelectorAll('button');
        for (const button of buttons) {
          if (button.textContent.includes('Edit Profile')) {
            button.click();
            break;
          }
        }
    });
    console.log('Edit profile clicked successfully!');
    
    await page.$eval('input[name="phone"]', (inputField) => {
        inputField.value = '';
    });
      
    await page.type('input[name="phone"]', '9876543210');
    console.log('phone number changed successfully!');

    const saveChanges = await page.waitForXPath("//button[contains(text(), 'Save')]");
    await saveChanges.click();

    console.log('changed successfully!');

    const queryList = await page.waitForXPath("//a[contains(text(), 'Query List')]");
    await queryList.click();

    const deactivateAccount1 = await page.waitForXPath("//a[contains(text(), 'Deactivate Account')]");
    await deactivateAccount1.click();

    

    const deactivateAccount2 = await page.waitForXPath("//button[contains(text(), 'Deactivate Account')]");
    await deactivateAccount2.click();

    await delay(1500);

    const deactivate = await page.waitForXPath("//button[contains(text(), 'Deactivate')]");
    await deactivate.click();
}



async function adminLogin() {
  const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      slowMo: 30,
  });
  const page = await browser.newPage();

  await page.evaluateOnNewDocument(() => {
      window.confirm = () => true;
    });

  await page.goto("https://8081-afaadedbcdddcfcdcebdafbeaeaadbdbabf.project.examly.io//#/Home"); 

  //Admin Login
  const loginAndRegisters = await page.waitForXPath("//button[contains(text(), 'Login/Register')]");
  await  loginAndRegisters.click();
  const continueAsBuyers = await page.waitForXPath("//button[contains(text(), 'Continue as Admin')]");
  await continueAsBuyers.click();

  await page.waitForSelector('input[name="email"]');
  await page.type('input[name="email"]', "admin@gmail.com");

  await page.waitForSelector('input[name="password"]');
  await page.type('input[name="password"]', "Admin@32");

  const adminSubmit = await page.waitForXPath("//button[contains(text(), 'Sign In')]");
  await adminSubmit.click();

  //View all Properties
  const propertyDetails = await page.waitForXPath("//a[contains(text(), 'Property Details')]");
  await propertyDetails.click();

  //Select A single Property
  await page.waitForSelector('input[type="number"]');
  await page.type('input[type="number"]', "9");

  const viewProperty = await page.waitForXPath("//button[contains(text(), 'View')]");
  await viewProperty.click();

  const closeProperty = await page.waitForXPath("//button[contains(text(), 'Close')]");
  await closeProperty.click();

  delay(2000);

  //View all Agents
  const agentDetails = await page.waitForXPath("//a[contains(text(), 'Agent Details')]");
  await agentDetails.click();


  //Select a Single Agent
  await page.waitForSelector('input[type="number"]');
  await page.type('input[type="number"]', "5");

  const viewAgent = await page.waitForXPath("//button[contains(text(), 'View')]");
  await viewAgent.click();

  const closeAgent = await page.waitForXPath("//button[contains(text(), 'Close')]");
  await closeAgent.click();

  delay(2000);

  //View all Users
  const userDetails = await page.waitForXPath("//a[contains(text(), 'User Details')]");
  await userDetails.click();

  //Select a Single User
  await page.waitForSelector('input[type="number"]');
  await page.type('input[type="number"]', "29");
  
  const viewUser = await page.waitForXPath("//button[contains(text(), 'View')]");
  await viewUser.click();

  const closeUser = await page.waitForXPath("//button[contains(text(), 'Close')]");
  await closeUser.click();

  delay(2000);

  //View all Queries
  const queriesRaised = await page.waitForXPath("//a[contains(text(), 'Queries Raised')]");
  await queriesRaised.click();

  //Select a Single Query
  await page.waitForSelector('input[type="number"]');
  await page.type('input[type="number"]', "4");

  await page.waitForSelector('input[placeholder="Enter a reply"]');
  await page.type('input[placeholder="Enter a reply"]', "Hello There");
  
  //Post Reply
  const postReply = await page.waitForXPath("//button[contains(text(), 'Post Reply')]");
  await postReply.click();

  //Logout
  await page.waitForSelector(".aprofile");
  await page.click(".aprofile");

  const adminLogout = await page.waitForXPath("//a[contains(text(), 'Logout')]");
  await adminLogout.click();

}


async function registerAsSeller() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    await page.goto('https://8081-afaadedbcdddcfcdcebdafbeaeaadbdbabf.project.examly.io//#/Home');

    await page.waitForFunction(() => {
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        if (button.textContent.includes('Login') && button.textContent.includes('Register')) {
          button.click();
          return true;
        }
      }
      return false;
    });

    const continueAsSeller = await page.waitForXPath("//button[contains(text(), 'Continue as Seller')]");
    await continueAsSeller.click();

    await page.waitForXPath("//button[contains(text(), 'Sign up')]");
    const signUpButton = await page.$x("//button[contains(text(), 'Sign up')]");
    await signUpButton[0].click();

    await page.waitForSelector('input[name="name"]');
    await page.type('input[name="name"]', 'Mathi');
    await page.type('input[name="email"]', 'mathi@gmail.com');
    await page.type('input[name="phone"]', '9876543210');
    await page.type('input[name="password"]', 'Mathi@22');
    await page.type('textarea[name="address"]', '1/23 Main Street');

    const fileInput = await page.waitForSelector('input[name="profileImage"]');
    const filePath = 'home.png';
    await fileInput.uploadFile(filePath);

    // Wait for the "Sign Up" button to be clickable after file upload
    await page.waitForFunction(() => {
      const button = document.querySelector('button[type="submit"]');
      return button && !button.disabled;
    });

    await page.click('button[type="submit"]');

    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    await browser.close();
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
async function loginAsSeller() {
    let page;
  
    try {
      const browser = await puppeteer.launch({ headless: false });
      page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 720 });
  
      await page.goto('https://8081-afaadedbcdddcfcdcebdafbeaeaadbdbabf.project.examly.io//#/Home');
      await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  
      await login(page);
  
      await proceedToYourProperty(page);
  
      await updatePropertyInfo(page, 'New Property Title', 'This is a sample description.');
  
      console.log('Title and Description updated successfully!');
  
      await replyToQuery(page, 'This is a test reply');
  
      console.log("query replied");
  
      await deactivateAccount(page);
  
      console.log('Account deactivated successfully!');
  
      await browser.close();
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
  
  async function login(page) {
    const loginRegisterButton = await page.waitForXPath("//button[contains(text(), 'Login') and contains(text(), 'Register')]");
    await loginRegisterButton.click();
    await page.waitForTimeout(1000);
  
    const continueAsSeller = await page.waitForXPath("//button[contains(text(), 'Continue as Seller')]");
    await page.waitForTimeout(1000);
    await continueAsSeller.click();
    await page.waitForTimeout(1000);
  
    await page.waitForSelector('form');
    await page.type('input[name="email"]', 'magi@gmail.com');
    await page.type('input[name="password"]', 'Magi@2002');
    await page.waitForTimeout(1000);
  
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
  }
  
  async function proceedToYourProperty(page) {
    await page.waitForSelector('.nav-item.dropdown');
    await page.waitForTimeout(1000);
  
    await page.click('.nav-item.dropdown');
  
    await page.waitForTimeout(1000);
  
    await page.waitForSelector('.dropdown-menu a.dropdown-item');
    const yourPropertyLink = await page.$('.dropdown-menu a.dropdown-item');
    await yourPropertyLink.click();
    await page.waitForTimeout(1000);
  
    await page.evaluate(() => {
      const inputField = document.querySelector('input[name="phone"]');
      if (inputField) {
        inputField.value = '';
      }
    });
  
    await page.type('input[name="phone"]', '1111111111');
    await page.waitForTimeout(1000);
  
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        if (button.textContent.includes('Save')) {
          button.click();
          break;
        }
      }
    });
    await page.waitForTimeout(1000);
  }
  
  async function updatePropertyInfo(page, newTitle, newDescription) {
    await selectLink(page, 'Your Property');
  
    await page.waitForTimeout(1000);
  
    await page.waitForFunction(() => {
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        if (button.textContent.includes('Edit')) {
          button.click();
          return true;
        }
      }
      return false;
    });
  
    await page.waitForTimeout(1000);
  
    await page.evaluate(() => {
      const titleInput1 = document.querySelector('input[name="title"]');
      if (titleInput1) {
        titleInput1.value = '';
      }
    });
  
    // Use page.evaluate() to change the value of the Title input field
    await page.waitForSelector('input[name="title"]');
    const titleInput = await page.$('input[name="title"]');
    await titleInput.type(newTitle);
  
    // Clear the existing description
    const descriptionInput = await page.$('textarea[name="description"]');
    await descriptionInput.click({ clickCount: 3 });
    await descriptionInput.press('Backspace');
  
    // Fill in the Description field
    await page.type('textarea[name="description"]', newDescription);
  
    // Wait for the Submit button to become enabled and click it
    await page.waitForFunction(() => {
      const button = document.querySelector('button[type="submit"]');
      return button && !button.disabled;
    });
    await page.click('button[type="submit"]');
  }
  
  async function replyToQuery(page, replyMessage) {
    await selectLink(page, 'Query List');
  
    await page.waitForSelector('input[placeholder="Enter a reply"]');
    await page.type('input[placeholder="Enter a reply"]', replyMessage);
  
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        if (button.textContent.includes('Post Reply')) {
          button.click();
          break;
        }
      }
    });
  }
  
  async function deactivateAccount(page) {
    await selectLink(page, 'Deactivate Account');
  
    console.log('Deactivate Account page selected successfully!');
    await page.waitForTimeout(1000);
  
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        if (button.textContent.includes('Deactivate Account')) {
          button.click();
          break;
        }
      }
    });
  
    console.log('Deactivate Account button clicked successfully!');
    await page.waitForTimeout(1000);
  
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        if (button.textContent.includes('Deactivate')) {
          button.click();
          break;
        }
      }
    });
  
    console.log('Cancel button clicked successfully!');
    await page.waitForTimeout(1000);
  }
  
  async function selectLink(page, linkText) {
    await page.waitForSelector('.nav-item.dropdown');
    await page.waitForTimeout(1000);
  
    await page.click('.nav-item.dropdown');
  
    await page.waitForTimeout(1000);
  
    await page.waitForSelector('.dropdown-menu a.dropdown-item');
    const link = await page.$x(`//a[contains(text(), '${linkText}')]`);
    await link[0].click();
    await page.waitForTimeout(1000);
  }
  

(async () => {
  try {
    await loginAsSeller();
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();

async function main() {
  try {

    await buyerLogin();
    await adminLogin();
    await registerAsSeller();
    await loginAsSeller();
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

main();