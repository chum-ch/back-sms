/* eslint-disable no-restricted-syntax */

const XLSX = require('xlsx');
const { CustomError, KeyError } = require('../submodule/handle-error/index');

class UploadFile {
  static validateHeaders(arrHeaderExcel, schemas) {
    const { ColumnHeader } = schemas;
    let errorHeaders = [];
    arrHeaderExcel.forEach((key) => {
      const splitAsterisk = key.split('*');
      if (ColumnHeader[splitAsterisk[0]]) {
        const { Rules } = ColumnHeader[splitAsterisk[0]];
        if (Rules.some((rule) => rule.Required === true && splitAsterisk.length === 1)) {
          // Push column error when column is required but not found asterisk in the header
          errorHeaders.push({ [key]: 'Unknown column.' });
        }
      } else {
        errorHeaders.push({ [key]: 'Unknown column.' });
      }
    });
    const combinedObjectHeader = Object.assign({}, ...errorHeaders);
    if (Object.keys(combinedObjectHeader).length > 0) {
      errorHeaders = [combinedObjectHeader];
    }
    return errorHeaders;
  }

  static validateRows(headers, sheetData, schemas) {
    try {
      const { ColumnHeader, DataStartingRow } = schemas;
      const resultValidationRow = [];
      for (let rowIndex = 0; rowIndex < sheetData.length; rowIndex += 1) {
        const errorDetails = {
          RowNumber: DataStartingRow + rowIndex + 1,
        };
        const columns = [];
        for (let columnIndex = 0; columnIndex < headers.length; columnIndex += 1) {
          const cellValue = sheetData[rowIndex][columnIndex];
          const objHeader = ColumnHeader[headers[columnIndex]];
          if (objHeader) {
            const { Rules, Message } = objHeader;
            for (const rule of Rules) {
              if (rule.Required && !cellValue) {
                columns.push({ [headers[columnIndex]]: Message });
              }
            }
          }
        }
        if (columns.length > 0) {
          const combinedObject = Object.assign({}, ...columns);
          resultValidationRow.push({ ...errorDetails, ...combinedObject });
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
          return sheetData;
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
      let headers = sheetData.shift();
      resultValidation.ErrorColumnHeaders = this.validateHeaders(
        headers,
        schemas,
      );
      const cleanedData = sheetData.map((row) => row.map((cell) => cell.replace('*', '')));
      headers = headers.map((item) => item.replace('*', ''));
      resultValidation.ErrorRows = this.validateRows(headers, cleanedData, schemas);
      if (resultValidation.ErrorColumnHeaders.length === 0) {
        delete resultValidation.ErrorColumnHeaders;
      }
      if (resultValidation.ErrorRows.length === 0) {
        delete resultValidation.ErrorRows;
      }
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
    const keys = sheetData[0].map((item) => item.replace('*', ''));
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

module.exports.ClassesController = require('../controller/ClassesController');
module.exports.CoursesController = require('../controller/CoursesController');
module.exports.RoomsController = require('../controller/RoomsController');
module.exports.SchedulesController = require('../controller/SchedulesController');
module.exports.TrainersController = require('../controller/TrainersController');
