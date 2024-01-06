

    const { Builder, By, until } = require('selenium-webdriver');
    const assert = require('assert');


async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build(); 

    try {
        await driver.manage().window().maximize();
        await driver.get('https://foodie-emajamakovic.netlify.app/'); 

        //HOME LINK
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/footer/div/div[1]/ul/li[1]/a')),5000).click();

        const url = await driver.getCurrentUrl();
        const expectedRedirectedUrl = 'https://foodie-emajamakovic.netlify.app/';
        assert.strictEqual(url, expectedRedirectedUrl);
        console.log("Url:"+ url,", Exprected url: "+ expectedRedirectedUrl)
        

        //LOGIN LINK
         await driver.findElement(By.xpath('/html/body/div/div/footer/div/div[1]/ul/li[2]/a')).click();

        const loginurl = await driver.getCurrentUrl();

        const expectedLoginUrl = 'https://foodie-emajamakovic.netlify.app/login';
        assert.strictEqual(loginurl, expectedLoginUrl);
        console.log("Url:"+ loginurl,", Exprected url: "+ expectedLoginUrl)

        //SIGNUP LINK
        await driver.findElement(By.xpath('/html/body/div/div/footer/div/div[1]/ul/li[3]/a')).click();
        const signupnurl = await driver.getCurrentUrl();

        const expectedSignupUrl = 'https://foodie-emajamakovic.netlify.app/signup';
        assert.strictEqual(signupnurl, expectedSignupUrl);
        console.log("Url:"+ signupnurl,", Exprected url: "+ expectedSignupUrl)


    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await driver.quit();
    }
}

runTest();