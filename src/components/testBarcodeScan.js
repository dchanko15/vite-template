import {BarcodeType, BarcodeInfo} from './interfaces.js'


function CheckSectorBarcodes(candidates, scriptBarcodes, tExtraActionTypes, messages) {
    let barcodeID = -1;
    let ordinalNum = -1;
    let rowIndex;

    let bInfo;
    for (let i = 0; i < scriptBarcodes.length; i++) {
        bInfo = BarcodeInfo(scriptBarcodes[i], BarcodeType.Script);
        if (!bInfo.valid)
            messages.push("ნაშრომზე რიგით " + i.toString() + " შტრიხკოდი დაზიანებულია ან არ არის შესაბამისი ტიპის;");
        else {
            {
                barcodeID = bInfo.id;
                ordinalNum = bInfo.ordinalNum;
                rowIndex = candidates.findIndex(c => c.BarcodeID === barcodeID);
                if (rowIndex !== -1 &&
                    candidates[rowIndex].BarcodeNum === ordinalNum &&
                    candidates[rowIndex].BarcodeID === barcodeID) {
                    if (!candidates[rowIndex]["ActBarcodeID"])
                        candidates[rowIndex]["ActBarcodeID"] = barcodeID;
                    else {
                       // console.error("CheckSectorBarcodes", "Script Barcode duplicate", bInfo.barcode);
                        messages.push("ნაშრომი შტრიხკოდით №" + bInfo.ordinalNum + " ორჯერ იქნა დასკანირებული ან შტრიხკოდი დუბლირებულია;");
                    }

                } else {
                   // console.error("CheckSectorBarcodes", "Script Barcode not found", bInfo.barcode);
                    messages.push("შტრიხკოდი № " + bInfo.ordinalNum + " არ უნდა იყოს დაკრული არც ერთ ნაშრომზე;");
                }
            }
        }
    }

    for (let i = 0; i < candidates.length; i++) {
        let noScript = false;
        rowIndex = -1;
        if (candidates[i]["ExtraActionType"])
            rowIndex = tExtraActionTypes.findIndex(ea => ea.ID === candidates[i]["ExtraActionType"]);
        if (rowIndex !== -1)
            noScript = tExtraActionTypes[rowIndex]["NoScript"]

        if (!noScript && candidates[i]["ActBarcodeID"] == null) {
           // console.error("CheckSectorBarcodes", "Script is missing for table ", candidates[i]["TableNum"]);
            messages.push("მაგიდისათვის № " + candidates[i]["TableNum"].toString() + " ნაშრომი არ არის რეგისტრირებული;");

        }
        if (noScript && !candidates[i]["ActBarcodeID"]) {
            //console.error("CheckSectorBarcodes", "Script could not be presented", candidates[i]["TableNum"]);
            messages.push("ნაშრომი მაგიდისათვის № " + candidates[i]["TableNum"].toString() + " არ უნდა იყოს რეგისტრირებული;");
        }
    }
}

function SetSectorBarcodes(candidates, tExtraActionTypes, tBarcodes, BarcodePageNum, messages) {
    let noScript = false;
    let rowIndex = -1;

    try {
        for (let i = 0; i < candidates.length; i++) {
            candidates[i]["SysBarcodeID"] = null;
            candidates[i]["BarcodeID"] = null;
            candidates[i]["ActBarcodeID"] = null;

            candidates[i]["BarcodePageNum"] = BarcodePageNum;


            let eet = {};
            noScript = false;
            if (candidates[i]["ExtraActionType"])
                eet = tExtraActionTypes.find(a => a.ID === candidates[i]["ExtraActionType"]);

            noScript = eet.NoScript;

            if (noScript)
                candidates[i]["BarcodeNum"] = null;
            else if (!candidates[i]["BarcodeNum"])
                candidates[i]["BarcodeNum"] = candidates[i]["TableNum"];

            if (candidates[i]["BarcodeNum"])
                rowIndex = tBarcodes.findIndex(b => b.BarcodeOrdinalNum === candidates[i]["BarcodeNum"]);

            if (rowIndex !== -1) {
                candidates[i]["BarcodeID"] = tBarcodes[rowIndex]["BarcodeID"];
                candidates[i]["BID"] = tBarcodes[rowIndex]["ID"];
                tBarcodes.splice(rowIndex, 1);
            }
        }
    } catch (e) {
        messages.push("სისტემური შეცდომაა (source: SetSectorBarcodes)");
        console.log(e.message);
    }
}


export default {
    CheckSectorBarcodes,
    SetSectorBarcodes,

}
