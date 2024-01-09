const { Builder, By, until } = require('selenium-webdriver');

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build(); // or 'firefox', depending on your installed driver

    try {
        await driver.manage().window().maximize();
        await driver.get('https://foodie-emajamakovic.netlify.app/'); // Replace with your app's URL

       
        let header = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/div[5]/div/div[2]/div[1]')),5000);
        let text = await header.getText();

        if (text === 'Recipe with the most likes') {
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