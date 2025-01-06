import { PrismaClient } from '@prisma/client';

import { createId, isCuid } from '@paralleldrive/cuid2';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { loadGoogleSheet } from './_common';

interface DataItem {
  cuid: string;
  name: string;
  group: string;
}

export const createCuidInSheet = async (
  sheetName: string,
  cuidColumn = 'A',
) => {
  const prisma = new PrismaClient();
  const doc = await loadGoogleSheet();

  const sheet = doc.sheetsByTitle[sheetName];
  const rows: GoogleSpreadsheetRow<DataItem>[] = await sheet.getRows();
  await sheet.loadCells();

  for (const row of rows) {
    try {
      const cuid = isCuid(row.get('cuid')) ? row.get('cuid') : createId();
      sheet.getCellByA1(`${cuidColumn}${row.rowNumber}`).value = cuid;
    } catch (error) {
      console.error(error);
    }
  }

  try {
    await sheet.saveUpdatedCells();
  } catch (error) {
    console.error(error);
  }

  await prisma.$disconnect();
};

export const createCuids = async (sheets: string[]) => {
  for (const sheet of sheets) {
    await createCuidInSheet(sheet);
  }
  console.log('All updates saved successfully.');
};
