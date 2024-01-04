const { Builder, By, until } = require('selenium-webdriver');

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build(); // or 'firefox', depending on your installed driver

    try {
        await driver.manage().window().maximize();
        await driver.get('https://foodie-emajamakovic.netlify.app/'); // Replace with your app's URL
        //login part
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[1]/div/div/a[1]')), 5000).click();

        const email = await driver.findElement(By.xpath('/html/body/div/div/div[2]/form/div/div[1]/input'));
        await email.sendKeys('ema@gmail.com');

        const password = await driver.findElement(By.xpath('/html/body/div/div/div[2]/form/div/div[2]/input'));
        await password.sendKeys('ema123');

        await driver.findElement(By.className('b-login')).click();
        ///////////////////////////////////////////////////////////

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/div[1]/div[1]/div/div[3]/a[1]')), 5000).click();


        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/div[1]/div/div/div/button[2]')), 5000).click();


        let element = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/div[2]/div[2]/div/div[2]/div[3]/div/div[3]/div[1]')), 10000);
        let text = await element.getText();

        if (text === 'Buregdžinica Sac') {
            console.log('Text matches.Test passed!');
        } else {
            console.log(`Text is "${text}". Test failed.`);
        }
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await driver.quit();
    }
}

runTest();