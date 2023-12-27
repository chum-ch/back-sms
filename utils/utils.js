/* eslint-disable no-restricted-syntax */
const XLSX = require('xlsx');
const { CustomError, KeyError } = require('../submodule/handle-error/index');

class UploadFile {
  static validateHeaders(arrHeaderExcel, schemas) {
    const { ColumnHeader } = schemas;
    const errorHeaders = [];
    arrHeaderExcel.forEach((key) => {
      if (!ColumnHeader[key]) {
        errorHeaders.push({ [key]: 'Unknown column.' });
      }
    });
    return errorHeaders;
  }

  static validateRows(sheetData, schemas) {
    try {
      const { ColumnHeader, DataStartingRow } = schemas;
      const resultValidationRow = [];
      for (let rowIndex = 0; rowIndex < sheetData.length; rowIndex += 1) {
        const errorDetails = {
          RowNumber: DataStartingRow + rowIndex + 1,
          Columns: [],
        };
        for (const [columnIndex, [key, value]] of Object.entries(
          ColumnHeader,
        ).entries()) {
          const { Rules, Message } = value;
          const cellValue = sheetData[rowIndex][columnIndex];
          for (const rule of Rules) {
            if (rule.Required && !cellValue) {
              errorDetails.Columns.push({ [key]: Message });
            }
          }
        }
        if (errorDetails.Columns.length > 0) {
          resultValidationRow.push(errorDetails);
        }
      }
      return resultValidationRow;
    } catch (error) {
      const e = error;
      throw e;
    }
  }

  static readExcelFile(req, schemas) {
    try {
      if (!req.file) {
        throw new CustomError({
          key: KeyError.InputValidation,
          message: 'Required file Excel upload.',
        });
      } else {
        const { buffer } = req.file;
        // Read data in file excel
        const worksheet = XLSX.read(buffer, { type: 'buffer' });
        // Loop each sheet.
        if (worksheet.SheetNames.length !== 1) {
          throw new CustomError({
            key: KeyError.InputValidation,
            message: 'Please upload only one sheet.',
          });
        } else {
          const name = worksheet.SheetNames[0];
          const sheet = worksheet.Sheets[name];

          // Converts each worksheet object to an array
          const sheetData = XLSX.utils.sheet_to_json(sheet, {
            range: schemas.DataStartingRow - 1, // Start reading data
            raw: false,
            header: 1,
            blankrows: false, // set to false to skip blank row
          });
          const cleanedData = sheetData.map((row) => row.map((cell) => cell.replace('*', '')));
          return cleanedData;
        }
      }
    } catch (error) {
      const e = error;
      throw e;
    }
  }

  static validateExcel(req, schemas) {
    try {
      // Converts each worksheet object to an array
      const resultValidation = {
        ErrorColumnHeaders: [],
        ErrorRows: [],
      };
      const sheetData = this.readExcelFile(req, schemas);
      const headers = sheetData.shift();
      resultValidation.ErrorColumnHeaders = this.validateHeaders(
        headers,
        schemas,
      );
      resultValidation.ErrorRows = this.validateRows(sheetData, schemas);
      return resultValidation;
    } catch (error) {
      const err = error;
      throw err;
    }
  }

  static getTemplate(schemas) {
    try {
      const { ColumnHeader } = schemas;
      const dataDownload = {};
      for (const [key, value] of Object.entries(ColumnHeader)) {
        const { Rules, Value } = value;
        let modifiedKey = key;
        Rules.forEach((rule) => {
          const { Required } = rule;
          if (Required) {
            modifiedKey = `${modifiedKey}*`;
          }
        });
        dataDownload[modifiedKey] = Value;
      }
      return dataDownload;
    } catch (error) {
      const err = error;
      throw err;
    }
  }

  static getDataAfterValidateExcel(sheetData) {
    const keys = sheetData[0];
    const result = sheetData.slice(1).map((row) => keys.reduce((obj, key, index) => {
      obj[key] = row[index];
      return obj;
    }, {}));
    return result;
  }
}
function generateCode() {
  // Generate random combination of two letters and two numbers
  const randomLetters = [...Array(2)].map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));
  const randomNumbers = [...Array(2)].map(() => Math.floor(Math.random() * 10));
  return randomLetters.join('') + randomNumbers.join('');
}
function getBatchProgress(done, total) {
  const getProgress = Number(
    Number.parseFloat((done / total) * 100).toFixed(2),
  );
  return getProgress;
}
module.exports = {
  UploadFile,
  generateCode,
  getBatchProgress,
};
