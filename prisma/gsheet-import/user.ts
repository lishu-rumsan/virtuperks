import { Gender, PrismaClient } from '@prisma/client';

import { createId } from '@paralleldrive/cuid2';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { loadGoogleSheet } from './_common';

export default async function importUsers(sheetName = 'employees') {
  const prisma = new PrismaClient();
  const doc = await loadGoogleSheet();

  const sheet = doc.sheetsByTitle[sheetName];
  const rows: GoogleSpreadsheetRow[] = await sheet.getRows();

  const roleCuid = createId();
  await prisma.role.create({
    data: {
      cuid: roleCuid,
      name: 'Admin',
    },
  });

  await prisma.permission.create({
    data: {
      roleId: roleCuid,
      subject: 'all',
      action: 'manage',
    },
  });

  for (const row of rows) {
    try {
      const cuid = row.get('cuid');
      const email = row.get('email');

      await prisma.user.create({
        data: {
          cuid,
          email,
          phone: row.get('phone'),
          gender: row.get('gender') as Gender,
        },
      });

      if (row.get('is_admin') === 'Y') {
        await prisma.userRole.create({
          data: {
            userId: cuid,
            roleId: roleCuid,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log('----- Import Users successful -----');

  await prisma.$disconnect();
}
