import { PrismaClient } from '@prisma/client';

import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { loadGoogleSheet } from './_common';

interface DataItem {
  cuid: string;
  name: string;
  number: string;
  currency: string;
}

export default async function importAccount(sheetName = 'accounts') {
  const prisma = new PrismaClient();
  const doc = await loadGoogleSheet();

  const sheet = doc.sheetsByTitle[sheetName];
  const rows: GoogleSpreadsheetRow<DataItem>[] = await sheet.getRows();

  const insertData: DataItem[] = [];
  for (const row of rows) {
    try {
      const cuid = row.get('cuid');
      console.log(`---------- ${row.get('name')} --------`);
      insertData.push({
        cuid,
        name: row.get('name'),
        number: row.get('number'),
        currency: row.get('currency'),
      });
    } catch (error) {
      console.error(error);
    }
  }

  await prisma.account.createMany({
    data: insertData,
  });

  console.log('----- Import Bank Accounts successful -----');

  await prisma.$disconnect();
}
