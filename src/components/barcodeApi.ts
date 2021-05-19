class InvalidBarcodeException extends Error {
    constructor() {
        super('Barcode type error');
    }
}

const BarcodeType =
    {
        Script: "4",
        Sector: "8",
        BarcodePage: "5",
    }
const BarcodeFormat =
    {
        ScriptID: "000000",
        ScriptOrdNum: "00",
        SectorID: "00000000",
        BarcodePageID: "0000000",
    }

class BarcodeInfo {
    GetBarcodeID(barcode: string) {
        let type = "";
        let id = -1;
        try {
            type = barcode.substr(0, 1);
            switch (type) {
                case  BarcodeType.Script                :
                    id = +barcode.substr(1, BarcodeFormat.ScriptID.length);
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
            console.error("GetBarcodeID", e.message, barcode);
        }
        return id;
    }

    GetBarcodeOrdinalNum(barcode: string) {
        let type = "";
        let id = -1;
        try {
            type = barcode.substr(0, 1);
            if (type === BarcodeType.Script)
                id = +barcode.substr(BarcodeFormat.ScriptID.length + 1, BarcodeFormat.ScriptOrdNum.length);
        } catch (e) {
            console.error("GetBarcodeOrdinalNum", e.message, barcode);
        }
        return id;
    }

    ValidateBarcode(barcode: string, bt: string): boolean {
        let id = -1;        let ordinalNum = -1;

        let barcodeType: string = barcode.substr(0, 1);

        if (barcodeType === bt) {
            id = this.GetBarcodeID(barcode);
            ordinalNum = -2;
            switch (barcodeType) {
                case BarcodeType.Script:
                    ordinalNum = this.GetBarcodeOrdinalNum(barcode);
                    break;
            }
        }
        return !((id === -1 || ordinalNum == -1));
    }

    FType: string;
    FId: number;
    FOrdinalNum: number;
    FValid: boolean;
    FControlDigit: number;
    FSRC: string;

    constructor (barcode: string) {
        this.FValid = this.ValidateBarcode(barcode, barcode[0]);

        if (!this.FValid)
            console.error("BarcodeInfo", "InvalidBarcode: ", barcode);
        if (this.FValid) {
            this.FType = barcode[0];
            this.FId = this.GetBarcodeID(barcode);
            this.FOrdinalNum = this.GetBarcodeOrdinalNum(barcode);
        }
        this.FSRC = barcode;
    }

    createFrom(_type: string, _id: number, _ordinalNum: number) {
        let d1, d2, d3;
        this.FType = _type;
        this.FId = _id;
        this.FOrdinalNum = _ordinalNum;
        this.FValid = true;

        d1 = this.FId % 10;
        d2 = (this.FId - d1) / 10 % 10;
        d3 = (this.FId - d2 * 10 - d1) / 100 % 10;

        this.FControlDigit = (d3 * 4 + d2 * 3 + d1 * 2) % 10;

    }

    get Valid() {
        return this.FValid;
    }

    get SRC() {
        return this.FSRC;
    }


    get Type() {
        return this.FType;
    }

    get Id() {
        return this.FId;
    }

    public get OrdinalNum() {
        return this.FOrdinalNum;
    }


    public VisualCode(): string {
        let s = "xx";
        if (this.FOrdinalNum > -1) {
            s = '00' + this.FOrdinalNum.toString()
            s = s.substr(s.length - 2, 2);
        } else {
            s = '00' + this.FId.toString();
            s = s.substr(s.length - 2, 2);
        }
        return s;
    }

    protected format(s: any, fmt: string) {
        let t = fmt + s.toString();
        return t.substr(-fmt.length);
    }

    public toString(): string {
        let barcodeStr = "";
        switch (this.FType) {
            case BarcodeType.Script:
                barcodeStr = BarcodeType.Script + this.format(this.FId,BarcodeFormat.ScriptID )+ this.format(this.FOrdinalNum, BarcodeFormat.ScriptOrdNum);
                break;
            case BarcodeType.Sector:
                barcodeStr = BarcodeType.Sector + this.format(this.FId,BarcodeFormat.SectorID) + this.FControlDigit.toString();
                break;
            case BarcodeType.BarcodePage:
                barcodeStr = BarcodeType.BarcodePage + this.format(this.FId,BarcodeFormat.BarcodePageID) + this.FControlDigit.toString();
                break;


        }
        return barcodeStr;
    }


}

