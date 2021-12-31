import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { CellFormater } from "./CellFormater";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgAbstractField } from "ag-grid-community";
//import { setAriaExpanded } from "ag-grid-community/dist/lib/utils/aria";
//import { setAriaSetSize } from "ag-grid-community/dist/lib/utils/aria";

const GridFunction = () => {
  const [rowCount, setRowCount] = useState("");
  const [colCount, setColCount] = useState("");

  const [RowcountArr, setRowCountArr] = useState([]);
  //const [arr1, setColCountArr] = useState([])
  const [appCount, setAppCount] = useState("");
  const [appCountArray, setAppCountArray] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [dataMapp, setDataMap] = useState([]);
  //const [columns, setColumns] = useState([])
  //const [arrMapp, setArrMapp] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [ss, setSS] = useState([]);

  const [rowData, setRowData] = [];
  const [arrnumm, setArrnumm] = [];
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [resultt, setResult] = useState([]);
  const [map, setMap] = useState([]);
  const getRowNodeId = (data) => data.id;

  const [showTable, setShowTable] = useState(false);

  const Grid = async () => {
    setShowTable(false);
    console.log("hello");
    let tab = rowCount * appCount;
    for (let i = 1; i <= tab; i++) {
      RowcountArr.push("trial" + i);
    }
    //setRowCountArr(RowcountArr)
    console.log("Row count array", RowcountArr);

    const arr1 = [];
    for (let i = 1; i <= colCount; i++) {
      let x = {};
      let tab = rowCount * appCount;
      console.log("Tab count", tab);
      for (let j = 1; j <= tab; j++) {
        x["trial" + j] = "";
        console.log("x", x);
      }
      arr1.push(x);
    }
    setArr1(arr1);
    console.log("Array one:", arr1);

    for (let i = 1; i <= appCount; i++) {
      appCountArray.push(i);
    }
    console.log("App count array", appCountArray);

    const dataMapp = RowcountArr.map((v, index) => ({
      field: v,
      editable: function (params) {
        // const tt = params.data;
        // console.log("TT", tt);
        // const t = params.data.trial1;
        // console.log("T", t);
        // console.log("Param data", t);
        // var spaceCount = t.split(" ").length - 1;
        // console.log("space", spaceCount);
        // let spp = t.split(" ");
        //console.log("Index", params);
        return params.node.data;
      },
      headerName: "Trial " + ((index % rowCount) + 1)
      //cellRenderer: "CellFormater",
    }));
    console.log("dataMapp : ", dataMapp);
    setDataMap(dataMapp);
    setShowTable(true);
  };

  const newt = () => {
    let rowCount1 = parseInt(rowCount, 10);
    const xx = [];
    gridApi.forEachNode((node) => xx.push(node.data));
    const resultt = xx.map(Object.values);
    //console.log("MAP array", resultt);
    // console.log("Nr", nr)
    let nr1 = resultt[0].map((x, i) => resultt.map((x) => x[i]));
    console.log("Transpose Array", nr1);
    var res = nr1.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / rowCount1);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
    console.log("Final Data Array:", res);
    const operator1 = { trial1: res[0][0], trial2: res[0][1] };
    const operator2 = { trial1: res[1][0], trial2: res[1][1] };
    const operator = { operator1, operator2 };
    console.log("Operator", operator);
  };

  ///console.log("RES", res)
  
  const setHeaderNames = () => {
    const newColumns = gridApi.getColumnDefs();
    console.log("New columns", newColumns);
    let rowData = [];
    newColumns.forEach((node) => rowData.push(node.data));
    console.log("RowData", rowData);
    const xx = [];
    gridApi.forEachNode((node) => xx.push(node.data));
    gridApi.forEachNode((node) => console.log("nd", node.data));
    console.log("XX", xx);
    let resultt = xx.map(Object.values);
    console.log("Result", resultt);

    console.log("Result[0]", resultt[0]);
    const reso = resultt[0];
    console.log("RESO", reso[1]);

    


    // let spacee = reso[0].split(" ");
    // let spacee1 = reso[1].split(" ");

    // console.log("result/space[0]", spacee);
    // console.log("result/space[1]", spacee1);
    // //let ss = [];
    //Adding data
    for (let i = 0; i < reso.length; i++) {
      let spacee = reso[i].split(" ");
      //let ind = reso[i].map(index => console.log("res ind",index))
      ss.push(spacee);
    }

    console.log("Reso[i]", ss);
    let arrnumm = [];
    for (let i = 0; i < ss.length; i++) {
      const sdd = ss[i].map((i) => i);
      arrnumm.push(sdd);
    }

    console.log("Array str", arrnumm);
    let arrNum = [];
    for (let i = 0; i < ss.length; i++) {
      let strToNum = ss[i].map((i) => Number(i));
      arrNum.push(strToNum);

      //console.log("Array string conversion", strToNum); //Convert array of string into array of numbers
    }

    console.log("Array to num", arrNum);

    // let newarrg = arrNum.map(arrk => arrk[0])
    // console.log("NEWARRG", newarrg)

    let newss = [];
    for (let i = 0; i < colCount; i++) {
      newss.push(arrnumm.map((arr) => arr[i]));
    }
    console.log("NEWS", newss);

    console.log(resultt[1]);
    console.log("01", resultt[0][1]);
    console.log("10", resultt[1][0]);

    console.log("ColumnDef1", resultt);

    const arr11 = [];

    for (let i = 1; i <= colCount; i++) {
      let x = {};
      let tab = rowCount * appCount;
      console.log("Tab count", tab);
      for (let j = 1; j <= tab; j++) {
        if (newss[i - 1][j - 1] === " ") {
          x["trial" + j] = " ";
        } else {
          x["trial" + j] = newss[i - 1][j - 1];
        }

        // x["trial" + j] = "";
        //console.log("x", x);
      }
      arr11.push(x);
      setArr1(arr11);
    }

    console.log("New arr1", arr11);
  };

  // const ValueGetter = (params) => {
  //   console.log(params.data);
  // };

  // const onBtWhich = () => {
  //   var cellDefs = gridApi.getEditingCells();
  //   if (cellDefs.length > 0) {
  //     var cellDef = cellDefs[0];
  //     console.log(cellDef.column.instanceId);
  //     var iid = cellDef.column.instanceId;
  //     var ccd = cellDef.rowIndex;
  //     console.log("ccd", ccd);
  //     console.log("Instance id:", iid);
  //     var cold = cellDef.column.getId();
  //     console.log("cold:", cold);
  //     console.log(
  //       "editing cell is: row = " +
  //         cellDef.rowIndex +
  //         ", col = " +
  //         cellDef.column.getId() +
  //         ", floating = " +
  //         cellDef.rowPinned
  //     );
  //     const xx = [];
  //     gridApi.forEachNode((node) => xx.push(node.data[cold]));
  //     console.log("XX", xx);
  //     let result = xx[0];
  //     console.log(result);
  //     let space = result.split(" ");
  //     console.log("Div", space);
  //     //gridApi.forEachNode((node) => console.log(node.data))

  //     gridApi.forEachNode((node) =>
  //       console.log(ccd, iid, node.data[cold], cold)
  //     );
  //   } else {
  //     console.log("no cells are editing");
  //   }
  // };

  // const onBtStopEditing = () => {
  //   gridApi.stopEditing();
  // };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const CellEditor = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value);
    const refInput = useRef(null);

    useEffect(() => {
      setTimeout(() => refInput.current.focus());
    }, []);

    useImperativeHandle(ref, () => {
      return {
        getValue() {
          return value;
        },
        isCancelBeforeStart() {
          return false;
        }
      };
    });

    return (
      <input
        type="number"
        ref={refInput}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        style={{ width: "100%" }}
      />
    );
  });

  const onCellKeyPress = (e) => {
    console.log(e.rowIndex);
    var keyPressed = e.event.key;
    if (keyPressed === "k") {
      setHeaderNames();
    }
  };

  return (
    <div>
      <input
        //readOnly
        type="text"
        id="txtrows"
        value={appCount}
        placeholder="Appraiser Count = 1"
        onChange={(e) => setAppCount(e.target.value)}
      />
      <input
        type="text"
        id="txtrows"
        value={colCount}
        placeholder="Set Sample"
        onChange={(e) => setColCount(e.target.value)}
      />
      <input
        type="text"
        id="txtrows"
        value={rowCount}
        placeholder="Set Trial"
        onChange={(e) => setRowCount(e.target.value)}
      />
      <button onClick={Grid}>Create Table</button>
      <button onClick={newt}>GET DATA</button>
      <button onClick={setHeaderNames}>Divide data</button>
      {/* <button onClick={() => onBtWhich()}>which ()</button>
      <button onClick={() => onBtStopEditing()}>stop ()</button>
      <button onClick={ValueGetter}>Value getter</button> */}

      {showTable ? (
        <div style={{ height: "200px", width: "1000px", flex: "50%" }}>
          <AgGridReact
            getRowNodeId={getRowNodeId}
            //key={index}
            className="ag-theme-alpine"
            rowData={arr1}
            key={dataMapp.field}
            onGridReady={onGridReady}
            //columnDefs={dataMapp}

            frameworkComponents={{
              numericEditor: CellEditor
              //CellFormater: CellFormater,
            }}
            defaultColDef={{
              editable: true,
              sortable: true,
              flex: 1,
              minWidth: 100,
              filter: true

              ///resizable: true
            }}
            onCellKeyPress={onCellKeyPress}
          >
            {dataMapp.map((column) => (
              <AgGridColumn {...column} key={column.field} />
            ))}
          </AgGridReact>
        </div>
      ) : null}
    </div>
  );
};

export default GridFunction;
