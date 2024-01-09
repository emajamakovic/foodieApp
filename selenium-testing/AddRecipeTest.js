
const { Builder, By, until } = require('selenium-webdriver');

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build(); // or 'firefox', depending on your installed driver

    try {
        await driver.manage().window().maximize();
        await driver.get('https://foodie-emajamakovic.netlify.app/'); // Replace with your app's URL
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[1]/div/div/a[1]')), 5000).click();

        const email = await driver.findElement(By.xpath('/html/body/div/div/div[2]/form/div/div[1]/input'));
        await email.sendKeys('ema@gmail.com');

        const password = await driver.findElement(By.xpath('/html/body/div/div/div[2]/form/div/div[2]/input'));
        await password.sendKeys('ema123');

        await driver.findElement(By.xpath('/html/body/div/div/div[2]/form/div/button')).click();
        
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/div[1]/div[1]/div/div[3]/a[2]')), 5000).click();

        const name = await driver.wait(until.elementLocated(By.id('recipeName-input')),5000);
        await name.sendKeys('Fluffernutter Brownies');

        const duration = await driver.findElement(By.id('duration-input'));
        await duration.sendKeys('53 mins');

        const directions = await driver.findElement(By.id('directions-input'));
        await directions.sendKeys('Bake on 150 degres');

        const ingredients = await driver.findElement(By.id('ingredients-input'));
        await ingredients.sendKeys('water');
        await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[4]/div/button')).click();

        const image = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[5]/input'));

        const imagePath = 'C:/Users/Korisnik/Desktop/foodie/foodie/frontend/src/uploads/dessert1.JPG';

        await image.sendKeys(imagePath);

        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/div[6]/button')), 5000).click();


        let element = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/div[7]')), 10000);
        let text = await element.getText();

        if (text === 'All fields must be filled.') {
            console.log('Text matches. Recipe is not saved due to missing filled all fields');
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