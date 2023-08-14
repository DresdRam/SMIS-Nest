/*require('core-js/modules/es.promise');
require('core-js/modules/es.string.includes');
require('core-js/modules/es.object.assign');
require('core-js/modules/es.object.keys');
require('core-js/modules/es.symbol');
require('core-js/modules/es.symbol.async-iterator');
require('regenerator-runtime/runtime');
*/
import * as ExcelJs from "exceljs/dist/exceljs.min.js";
import { FieldJournalDto } from "../dto/fieldJournal.dto";

export class Excel {
  
  static exportFieldJournalWorkbook(fieldJournalArray: FieldJournalDto[], time_section: string) {

    const workbook = this.createNewWorkbook();
    const worksheet = workbook.addWorksheet('Sheet');

    const sheetHeader = this.getTimeSectionHeader(time_section);

    const headerStyle = {
      font: { bold: true, size: 16 },
      alignment: { horizontal: 'center', vertical: 'middle' },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'a6a6a6' } },
      border: {
        top: { style: 'thick' },
        left: { style: 'thick' },
        bottom: { style: 'thick' },
        right: { style: 'thick' }
      }
    };

    const netStyle = {
      font: { size: 18 },
      alignment: { horizontal: 'center', vertical: 'middle' },
      border: {
        top: { style: 'thick' },
        left: { style: 'thick' },
        bottom: { style: 'thick' },
        right: { style: 'thick' }
      }
    };

    const netHeaderStyle = {
      font: { size: 18 },
      alignment: { horizontal: 'center', vertical: 'middle' },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'a6a6a6' } },
      border: {
        top: { style: 'thick' },
        left: { style: 'thick' },
        bottom: { style: 'thick' },
        right: { style: 'thick' }
      }
    };

    const cellStyle = {
      font: { size: 14 },
      alignment: { horizontal: 'center', vertical: 'middle' },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    };

    worksheet.mergeCells(2, 1, 2, 4);
    worksheet.getCell('A2').value = sheetHeader;
    worksheet.getCell('A2').style = headerStyle;
    worksheet.getCell('B2').style = headerStyle;
    worksheet.getCell('C2').style = headerStyle;
    worksheet.getCell('D2').style = headerStyle;

    worksheet.mergeCells(1, 2, 1, 4);
    worksheet.getCell('B1').value = 'صافي الميداني';
    worksheet.getCell('B1').style = netHeaderStyle;
    worksheet.getCell('C1').style = netHeaderStyle;
    worksheet.getCell('D1').style = netHeaderStyle;

    worksheet.getCell('A1').value = fieldJournalArray.length;
    worksheet.getCell('A1').style = netStyle;

    worksheet.getCell('A3').value = 'الاسم';
    worksheet.getCell('A3').style = headerStyle;

    worksheet.getCell('B3').value = 'الرقم القومي';
    worksheet.getCell('B3').style = headerStyle;

    worksheet.getCell('C3').value = 'التقييم';
    worksheet.getCell('C3').style = headerStyle;

    worksheet.getCell('D3').value = 'الدفع';
    worksheet.getCell('D3').style = headerStyle;

    worksheet.getRow(1).height = 70;
    worksheet.getRow(2).height = 50;
    worksheet.getRow(3).height = 30;

    worksheet.columns = [
      { key: 'الاسم', width: 40 },
      { key: 'الرقم القومي', width: 30 },
      { key: 'التقييم', width: 12 },
      { key: 'الدفع', width: 10 }
    ];

    const headerRow = worksheet.getRow(3);
    headerRow.eachCell((cell: any) => {
      cell.style = headerStyle;
    });

    fieldJournalArray.forEach((fieldJournal: FieldJournalDto) => {
      const row = worksheet.addRow(fieldJournal);
      row.eachCell((cell: any) => {
        cell.style = cellStyle;
      });
    });

    return workbook;
  }

  private static createNewWorkbook() {

    const workbook = new ExcelJs.Workbook();
    workbook.creator = 'DresdRam';
    workbook.lastModifiedBy = 'DresdRam';
    workbook.created = new Date();
    workbook.modified = new Date();

    return workbook;
  }

  private static getTimeSectionHeader(time_section: string) {
    if (time_section == "صباحية") {

      return "الميداني المتاح لخدمة الصباحية";

    } else if (time_section == "مسائية") {

      return "الميداني المتاح لخدمة المسائية";

    } else if (time_section == "سهاري") {

      return "الميداني المتاح لخدمة السهاري";

    }

    return ""
  }

}