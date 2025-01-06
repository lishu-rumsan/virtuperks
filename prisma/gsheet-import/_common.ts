export const config = {
  googleSpreadsheetId: '1SilEfeEbezZmkDUCQtT1EZZH1MgaveXfpDfBIzZtvs8',
};

import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { googleCreds } from '../../config/google-sheets-credentials';

export const loadGoogleSheet = async () => {
  const serviceAccountAuth = new JWT({
    email: googleCreds.client_email,
    key: googleCreds.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(
    config.googleSpreadsheetId,
    serviceAccountAuth,
  );
  await doc.loadInfo();
  return doc;
};

export const sleep = (seconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
