export const BarcodeType =
    {
        Script: "4",
        Sector: "8",
        BarcodePage: "5",
    }
export const BarcodeFormat =
    {
        ScriptID: "000000",
        ScriptOrdNum: "00",
        SectorID: "00000000",
        BarcodePageID: "0000000",
    }


export function BarcodeInfo(barcode, bt = "") {
    let type = "";
    let id = -1;
    let ordinalNum = -1;
    let valid = false;

    valid = !bt || barcode[0] === bt;

    if (!valid)
        console.error("BarcodeInfo", "InvalidBarcodeType: ", barcode);
    if (valid) {
        try {
            type = barcode.substr(0, 1);
            switch (type) {
                case  BarcodeType.Script                :
                    id = +barcode.substr(1, BarcodeFormat.ScriptID.length);
                    ordinalNum = +barcode.substr(BarcodeFormat.ScriptID.length + 1, BarcodeFormat.ScriptOrdNum.length);
                    break;
                case
                BarcodeType.Sector :
                    id = +barcode.substr(1, BarcodeFormat.SectorID.length);
                    break;
                case
                BarcodeType.BarcodePage :
                    id = +barcode.substr(1, BarcodeFormat.BarcodePageID.length);
                    break;
            }
        } catch (e) {
            console.error("BarcodeInfo", e.message, barcode);
        }
    }
    let bInfo = {
        type,
        valid,
        id,
        ordinalNum
    }
    return bInfo;
}



