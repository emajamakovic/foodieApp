const { Builder, By, until } = require('selenium-webdriver');

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build(); // or 'firefox', depending on your installed driver

    try {
        await driver.manage().window().maximize();
        await driver.get('https://foodie-emajamakovic.netlify.app/'); // Replace with your app's URL

        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[1]/div/div/a[2]')), 5000).click();

        const userName = await driver.findElement(By.xpath('/html/body/div/div/div[2]/form/div/div[1]/input'));
        await userName.sendKeys('John Doe');

        const email = await driver.findElement(By.xpath('/html/body/div/div/div[2]/form/div/div[2]/input'));
        await email.sendKeys('johndoe@gmail.com');

        const password = await driver.findElement(By.xpath('/html/body/div/div/div[2]/form/div/div[3]/input'));
        await password.sendKeys('Password123.');

        await driver.findElement(By.className('s-signup')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/div[1]/div[1]/div/div[1]')),5000);


         console.log('Test passed');

         
        
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await driver.quit();
    }
}

runTest();