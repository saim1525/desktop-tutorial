const { GoogleSpreadsheet } = require('google-spreadsheet');

// Replace with your credentials and spreadsheet ID
const SPREADSHEET_ID = '1rCcIg0dtgNP2Czrzzg0KI1xTvf2w4LrZgtis9lLl_WI';
const CLIENT_EMAIL = 'heelo-901@hack-423813.iam.gserviceaccount.com';
const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDsWYlTczHgarXJ\nI3cZyQ4JLOYqBIRM+xqN+Ul6rhbtyn716DfHejjRW0iafYV75KxOfrffxgKcl9is\nVF7LLsERlVdEsLkWUgpnbNLWl4avI506Ou9AY9JH2h/5ZGR6MTkj4qe+NkfrjoVO\nFoDqmZYN+K9Dcz1X6Ye/lT2x3rZR/tchF5Ccaxi7T7BGrc2TlvMes+CTp3Kx/mjK\nJeKgxEPPQFHgeV5voLukOOk3TwkWeVl3poAhOonBm1e5p9Nxfz1J0PQacYVPXh+E\nMqxZY9ltaWHaLzqywGH4bpOkz+pq1fKCZzT5JHjCCxXaFq2DdCWdFb0mmJ1WnlE0\nxf+EUmwLAgMBAAECggEAL6RKwLYPPz/zXdSWzO1QtXvF94FKk+Pn8edmruKJv6wa\nVIJXQA/8hQMECxQzRIqPSxFTCjn1S9B1/iLRqt5FT8CNQ0zmOkAWVcvDYjtQDFy+\n9D5t/MpCWHZ5DIH2mQT0Ei49huOVMr/bUibKHMAR1cYjuhJwMpjh4rX4JjMRCEzV\npv1ZigAjyU1fwoeIN/Pk0sc+7+5hImeabyqCO4m5MPsZX3ZRKZUhixoHgxBOhm1l\n4Osr7HnB8qKlKN6593ApqPsTrwxHeIDgiJohl+rfqRunT2x2SJ9G9yJ40IOrldDN\nt5vshsutgptGOB/dsk4MjyY/t+l+YikuvnwJBpXAvQKBgQD87uqlzq7wn5XxJnu1\nENrotQb18FVI09mH2HL6QL2+vfD/uUtQviILfWE/ckxmkodJcl9uBnkbNkwQn2bP\nhSVFzQZDlDsjxd+4HiZ7mKWX2aMUgFLkKGH3lwnxybQjeypoSgaLJ+/pTrJr2Vef\nVJp12Cu0f+i7LJeWm8i8Yb2lNQKBgQDvNyVg3sZiCqFvXZm/JZvd8gf2XkTlzgur\nm/Wtqr1/QAadkrUofHDDHmlPWPqA+fFg3xJnJ2z2WdgdDQVIwKj4mVTsTfoGttK1\nntVMBvi6tnc9Rmi4xMPK6BWx31zFTwY2Hn6tlQL78gcm1OaXT9Pskz22e6mgzp3T\nOXeWx7g0PwKBgGNPW4pmsIGB51mcBo59Y7Zi/ayrBJFnvM19ywc/TEEMSwfdNRkq\nzis8u2Yx9pV/iubnpViJ6hspIoyUScXJPW0+pur51I6jLsgX7nww3zPUHBf8mo9C\n29Re1WS+EaCsx2XTSuZwc95jK+L0n1bL3SnQCrkAT9zOEWbtG8/7gH7RAoGBAJlz\nDo8tWKTbnOMLb+yl+25MK79miVvA6MuUp+xXcmeGcrfxvDPUX6FKiNNViJvjuWsi\nrXNuXv9IctFv4MviioGuGkPbYV+dN106Hik+758WHTc5S0P7NH2ckw4e8iu/nYRp\n22kOBXQItX27ZI/7rT481YGRoiZ9Y9BzNLuMMiWRAoGAYL+Vfyp1kiI23yo8DFp7\n5VyZ6tdCQ4XF6haf7jj7yhIWQHj/Sqja295oSthOYo/VqAwVfgTJ6gDuJnxnOeDb\n7pDKBMzo0VxDK5vqEwIswvpjOoM+GURKQo3G1J1i7RYbWdDFzKb9mWUJ6+Xi+Lyc\nNuCsDYYa+nBrpSksJcStWbc=\n-----END PRIVATE KEY-----\n';

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
