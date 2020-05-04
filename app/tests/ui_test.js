const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
require('dotenv').config()

describe('login', () => {
    const driver = new Builder().forBrowser('chrome').build();

    it('should display error when incorrect username and error entered', async () => {
        await driver.get(process.env.TEST_URL);
        await driver.findElement(By.name('username')).sendKeys('username');
        await driver.findElement(By.name('password')).sendKeys('password');
        await driver.findElement(By.name('submit')).click();
        const error = await driver.findElement(By.id('error')).getAttribute('innerHTML');
        expect(error).equal('Error: Incorrect password, please try to login again!')
    });

    it('should login successfully and show assessment page', async () => {
        await driver.get(process.env.TEST_URL);
        await driver.findElement(By.name('username')).sendKeys(process.env.TEST_USERNAME);
        await driver.findElement(By.name('password')).sendKeys(process.env.TEST_PASSWORD);
        await driver.findElement(By.name('submit')).click();
        const error = await driver.findElement(By.id('page_title')).getAttribute('innerHTML');
        expect(error).equal('Send Assessment')
    });

    it('should successfully send two assessments', async () => {
        await driver.get(process.env.TEST_URL);
        await driver.findElement(By.id('checkbox')).click();
        await driver.findElement(By.name('candidate_name')).sendKeys("Bob");
        await driver.findElement(By.name('candidate_email')).sendKeys(process.env.TEST_EMAIL);
        await driver.findElement(By.name('recruiter_email')).sendKeys(process.env.TEST_EMAIL, Key.ENTER);
        const success_header = await driver.findElement(By.id('page_header')).getAttribute('innerHTML');
        expect(success_header).equal('Assessments Sent');
    });

    it('should successfully send one assessment', async () => {
        await driver.get(process.env.TEST_URL);
        await driver.findElement(By.name('candidate_name')).sendKeys("Bob");
        await driver.findElement(By.name('candidate_email')).sendKeys(process.env.TEST_EMAIL);
        await driver.findElement(By.name('recruiter_email')).sendKeys(process.env.TEST_EMAIL, Key.ENTER);
        const success_header = await driver.findElement(By.id('page_header')).getAttribute('innerHTML');
        expect(success_header).equal('Assessment Sent');
    });

    it('should successfully logout', async () => {
        await driver.get(process.env.TEST_URL);
        await driver.findElement(By.id('logout_link')).click();
        const alert = await driver.findElement(By.id('success')).getAttribute('innerHTML');
        expect(alert).equal('Alert: You have successfully signed out!');
    });

    it('should successfully logout', async () => {
        await driver.get(process.env.TEST_URL);
        const error = await driver.findElement(By.id('error')).getAttribute('innerHTML');
        expect(error).equal('Error: No token provided, please login to access this page!');
    });

    after(async () => driver.quit());
});
