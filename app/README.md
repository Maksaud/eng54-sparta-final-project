# Sparta - Assessment Dispatcher

## Installation

```bash
git clone git@github.com:spartaglobal/AssessmentsDispatcher.git
npm install
npm start

# Your app will be running on localhost:3000
# Go to http://localhost:3000/login
```

### Troubleshooting
You may get an issue with `bcrypt` try running this to getting it running `npm rebuild bcrypt --build-from-source`.

## Setting up the app

You will need to setup a user on the app to to use. Go to `http://localhost:3000/register` and register a test account. You will need these credentials later when testing

## Environment Variables

You will need to create a `.env` in the root of the project and add all the variables below to run the app please see the system admin for these details.

```bash
API_KEY=<API key needed>
PYTHON_PATH_ID=<id_needed>
PYTHON_ASSESSMENT_ID=<id_needed>
JAVA_ASSESSMENT_ID=<id_needed>
CSHARP_ASSESSMENT_ID=<id_needed>
PSYCHOMETRIC_CAMPAIGN_ID=<id_needed>
TEST_PATH_ID=<id_needed>
JWT_EXPIRATION_MS=1000
DB_HOST=mongodb://<ip needed for DB>:27017/sparta
SECRET=<any secret string>
TEST_USERNAME=<chosen username>
TEST_PASSWORD=<chosen password>
TEST_URL=http://localhost:3000
TEST_EMAIL=richgurney1987@gmail.com
```

## Running the testing

```bash
npm run tests
```
