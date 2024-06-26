This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify



Username: muhammadkhurshid
Password: khurshid@123

http://rxtracker.ntp.gov.pk/


ANyDesk ID: 473381447
Password: asdf@1234

Protect my data

USE rxtracker;
GO
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'eTB_SQLShack@1';

CREATE SYMMETRIC KEY SymKey_eTB_Key WITH ALGORITHM = AES_256 ENCRYPTION BY CERTIFICATE Certificate_eTB;

OPEN MASTER KEY DECRYPTION BY PASSWORD = 'eTB_SQLShack@1';

OPEN MASTER KEY DECRYPTION BY PASSWORD = 'eTB_SQLShack@1';
OPEN SYMMETRIC KEY SymKey_eTB DECRYPTION BY CERTIFICATE Certificate_eTB;
                                    SELECT MAX(Id) FROM tbl_5
								   CLOSE SYMMETRIC KEY SymKey_eTB

GRANT VIEW DEFINITION ON SYMMETRIC KEY::SymKey_eTB TO [YourApplicationUser];


-- Create a symmetric key
USE YourDatabaseName; -- Replace 'YourDatabaseName' with your actual database name

-- Check if the key exists, and if it does, drop it (only if you want to recreate it)
IF EXISTS (SELECT * FROM sys.symmetric_keys WHERE name = N'SymKey_eTB')
    DROP SYMMETRIC KEY SymKey_eTB;

-- Create a new symmetric key
CREATE SYMMETRIC KEY SymKey_eTB
WITH ALGORITHM = AES_256
ENCRYPTION BY PASSWORD = 'YourPassword'; 


-- Create a self-signed certificate named 'certificate_eTB'
USE YourDatabaseName; -- Replace 'YourDatabaseName' with your actual database name

-- Check if the certificate exists, and if it does, drop it (only if you want to recreate it)
IF EXISTS (SELECT * FROM sys.certificates WHERE name = N'certificate_eTB')
    DROP CERTIFICATE certificate_eTB;

-- Create a new self-signed certificate without password encryption
CREATE CERTIFICATE certificate_eTB;


-- Open the certificate with the private key using the password
OPEN CERTIFICATE certificate_eTB
   DECRYPTION BY PASSWORD = 'YourPassword'; -- Replace 'YourPassword' with the actual password

-- Perform encryption or decryption operations here

-- Close the certificate
CLOSE CERTIFICATE certificate_eTB;