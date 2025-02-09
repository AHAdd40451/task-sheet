import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: 'ahad-568@api-1-440318.iam.gserviceaccount.com',
                private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCzE6dAxrXJw3+N\nokj4xpk6fSDlUxCXyrXUBHDNABZ2lYkARnaGh+n4BOUvYGNNpQNyJsmmKUe2Rxi9\nQe/tbNvF6tqIwTFscUfOyskkHj42sL0N5864ppqyX6RySBagyt6wFBm/rxFGQy/o\nRHv2HtRU/kWbXm+UGFU3/Jbttxxa69v5lVzJ3N0eoo5cKG1gRGsdxhBDOESPPl9o\nD6yENQV1S0LXT64wlHwLn3NEGQWpFOFp+pEWcHHctxaQlLR14QC3s6BF8pgDbXfL\naptgR6pFmqGMR2EmUwDrPrv0m7RPWHXQb+qwhP3Vmj/qa3tNISGYG2xXA7RfaKVw\n+7SvfKr3AgMBAAECggEANSn6BxSXRqmoFiPeVyEav48Dc6Gn9PCE78dLt8i1Yoo9\nbJv+tyzljLDjW5/Zi2UYc0zJo+9wb1CHKzTGpq2hR45UR7JXWnL9FwsEERl7beAl\nmFm/+PjZR2h2mUkGksD3wL2O8WXnkn0C3YlrZeO8NOlyP9CW/pgEwMTYCAXLQMBy\ntJz3+arrgmvbAX5u/t45FOOnsvtIh/t6tLsirZMUGdJuX12oc3XAlt6HFrTzO2q+\nZ1Gry4hjdA2LJ+StxUW3o02FP2D1XkLlhR+FpzgtovfBPPhK4Av5xZLcgi/olCRf\nH6ye/T++nwkrcmB/BFesnCkmhCgJc/4VblSnKjcpbQKBgQDhsq7wY9R+8l26bpdB\nF6hDkaOgrJNJI3nYXcL+TWouc76jJSmjHldC4rMkLV3xFCY6z17Ek1XPTbQ91ALf\nicsZeCBn3MK3zwfc+ULPKC5QJtHHX35eU8aj2AWRiyFwn2Azjg57d4lHQhOd8I8A\nBl7A4j2DgWGMOShL9vxY/YBTDQKBgQDLHpVCh4iAGg3S2d769xOInaTkU7tgSIZo\nf6/PjXHToegXs7oj+hlULWN23hmjUsGxnAJGZqsLwroYgxmA84oa/yqwgf/cUf93\nLUVfTeWQ1zIcKDnHp7CEL25tJzDf6AjmTp7YX3dNx3s0otgxjoZQbGysWgzlZOg7\n/4hNVeRFEwKBgCD96ayiKzHTY/gYqmuNdb9Kzsxx7aXHVcxXCGX8EwVvTfKzP/7k\nNIVGdkFXkF/pPh1iqsu5bdW72hkfoLvkfJfgg3wrPRt5XADlPurhSMPWqNuoDeTk\nAil5Lnc0C1NXOMzQezV5J8wO0KdJvt2WEMvJRoyuoP/KayWPmRu5EsURAoGAT89x\niJWmrecO3XWcJvJka3695rV736Y/odniI+SJAEYS4xVMo4xG3YuEFJXKbyE6WGZb\ngnwe410dMDp7D+8hqd/vTzGVbmWNwq84He2GsXXNC8FGisu6EQZuFlea3a/Xp17n\nDU/dmeMy5wjBeB9vaTRhMwujG5OdqM2MKg8AxZ8CgYB16KPm18HKClbeGd9qDF0S\nR704Vdm9g8dAhSrbs8XOpDbiIL/9PzvMke39Xq4tFI8zRcxG92ChbnRAIRDIIZqz\nLvtPSqLwifrRlbZuBHk/nBY3FUNQebWoJfmQF4pynkvOtLWS4VWxXdE0oC8iwAXT\nbqPW2rBGlTWaeAlLe+bcJA==\n-----END PRIVATE KEY-----\n',
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const sheetId = '1V07ce87n7_dpb_zfFT_Tee5MfizLXdDPHoojzCDuKIs';

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: 'Sheet1',
        });

        const rows = response.data.values;
        if (!rows) {
            return NextResponse.json({ error: 'No data found' });
        }

        const data = rows.slice(1).map((row) => {
            const item = {
                name: row[0],
                column_values: {
                    due_date: row[1],
                    budget: {
                        value: parseFloat(row[2].replace('$', '')),
                        type: 'currency'
                    },
                    progress: parseInt(row[3].replace('%', '')),
                    timeline: {
                        start_date: row[4].split(' - ')[0],
                        end_date: row[4].split(' - ')[1]
                    },
                    description: row[5]

                }
            };
            return item;
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
} 