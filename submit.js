const { GoogleSpreadsheet } = require('google-spreadsheet');

// Replace with your credentials and spreadsheet ID
const SPREADSHEET_ID = 'your_google_sheet_id';
const CLIENT_EMAIL = 'your_service_account_email';
const PRIVATE_KEY = 'your_service_account_private_key';

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const { input1, input2 } = JSON.parse(event.body);

    try {
        const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
        });
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow({ Input1: input1, Input2: input2 });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Success' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
