import React from 'react'
import Button from 'react-bootstrap/Button';
import Fab from '@material-ui/core/Fab';
import {makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import style from '../Tool/Style';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportExcel = ({ apiData, fileName }) => {
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <di style={style.paper}>
      <Fab  
          style={style.submit} 
          variant="extended" 
          color="primary" 
          aria-label="add" 
          className={classes.margin} 
          onClick = {(e) => exportToCSV(apiData, fileName)}
        >
        <GetAppIcon className={classes.extendedIcon} />
          Export Excel
      </Fab>
    </di>
  );
};