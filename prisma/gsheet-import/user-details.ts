import { PrismaClient, Service, UserType } from '@prisma/client';

import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { loadGoogleSheet } from './_common';

interface User {
  cuid: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

interface LookupData {
  cuid: string;
  name: string;
}

const lookupUser = (users: GoogleSpreadsheetRow<User>[], name: string) => {
  const user = users.find((row) => row.get('name') === name);
  if (!user) throw new Error(`User ${name} not found`);
  return user.get('cuid') || null;
};

const loadDepartments = async (doc: GoogleSpreadsheet) => {
  const sheet = doc.sheetsByTitle['departments'];
  const rows: GoogleSpreadsheetRow<LookupData>[] = await sheet.getRows();
  return rows;
};

const lookupDepartment = (
  rows: GoogleSpreadsheetRow<LookupData>[],
  name: string,
) => {
  const user = rows.find((row) => row.get('name') === name);
  if (!user) throw new Error(`User ${name} not found`);
  return user.get('cuid') || null;
};

export default async function importUserDetails(sheetName = 'employees') {
  const prisma = new PrismaClient();
  const doc = await loadGoogleSheet();
  const departments = await loadDepartments(doc);

  const sheet = doc.sheetsByTitle[sheetName];
  const rows: GoogleSpreadsheetRow[] = await sheet.getRows();

  for (const row of rows) {
    try {
      const cuid = row.get('cuid');
      console.log(`---------- ${row.get('name')} --------`);
      const userDetails = {
        cuid,
        name: row.get('name'),
        departmentId: lookupDepartment(departments, row.get('department')),
        managerId: lookupUser(rows, row.get('manager')),
        userType: row.get('jobType') as UserType,
        salary: parseInt(row.get('salary')),
        isApproved: true,
        isEmployee: true,
        extras: {
          position: row.get('position'),
          level: row.get('level'),
        },
      };

      await prisma.userDetails.create({
        data: userDetails,
      });

      await prisma.auth.create({
        data: {
          userId: cuid,
          service: Service.EMAIL,
          serviceId: row.get('email'),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  console.log('----- Import User Details successful -----');

  await prisma.$disconnect();
}
