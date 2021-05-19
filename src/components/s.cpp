

            public void SetSectorBarcodes(DSS.DSScripts ds)
			{
				bool noScript=false;
				int rowIndex=-1;
				ds.tBarcodes.RejectChanges();
				ds.tBarcodes.DefaultView.Sort="BarcodeOrdinalNum";
				ds.tExtraActionTypes.DefaultView.Sort="ID";
				for (int i=0; i<ds.tEntrantPlacement.Rows.Count; i++)
				{
					//ds.tEntrantPlacement.Rows[i]["BarcodeNum"]= System.DBNull.Value;
					ds.tEntrantPlacement.Rows[i]["SysBarcodeID"]= System.DBNull.Value;
					ds.tEntrantPlacement.Rows[i]["BarcodeID"]=System.DBNull.Value;
					ds.tEntrantPlacement.Rows[i]["ActBarcodeID"]=System.DBNull.Value;

					ds.tEntrantPlacement.Rows[i]["BarcodePageNum"]=BarcodePageNum;

					rowIndex=-1;
					noScript=false;
					if (ds.tEntrantPlacement.Rows[i]["ExtraActionType"]!=System.DBNull.Value)
						rowIndex=ds.tExtraActionTypes.DefaultView.Find(ds.tEntrantPlacement.Rows[i]["ExtraActionType"]);
					if (rowIndex!=-1)
						noScript = ((int)ds.tExtraActionTypes.DefaultView[rowIndex]["NoScript"])==1;


					if (noScript)
						ds.tEntrantPlacement.Rows[i]["BarcodeNum"]= System.DBNull.Value;
					else
						if (ds.tEntrantPlacement.Rows[i]["BarcodeNum"]==System.DBNull.Value)
						ds.tEntrantPlacement.Rows[i]["BarcodeNum"]=ds.tEntrantPlacement.Rows[i]["TableNum"];

					rowIndex=-1;
					if (ds.tEntrantPlacement.Rows[i]["BarcodeNum"]!=System.DBNull.Value)
						rowIndex = ds.tBarcodes.DefaultView.Find((int)ds.tEntrantPlacement.Rows[i]["BarcodeNum"]);
					if (rowIndex!=-1)
					{
						ds.tEntrantPlacement.Rows[i]["SysBarcodeID"]= ds.tBarcodes.DefaultView[rowIndex]["BarcodeID"];
						ds.tEntrantPlacement.Rows[i]["BarcodeID"]=ds.tBarcodes.DefaultView[rowIndex]["ID"];

						ds.tBarcodes.DefaultView.Delete(rowIndex);
					}
				}
			}


			public void CheckSectorBarcodes(candidates, BarcodeList, messages = [] )
            {
                int BID=-1;
                int OrdinalNum=-1;
                int rowIndex;



                messages.Clear();
                ds.tEntrantPlacement.DefaultView.Sort="SysBarcodeID";
                BarcodeInfo bInfo;
                for (int i=0; i<SctiptBarcodes.Count;i++ )
                {
                    bInfo = SctiptBarcodes[i];
                    if (!bInfo.Valid)
                        //throw new UI.UIException("შტრიხკოდი დაზიანებულია ან არ არის შესაბამისი ტიპის");
                        messages.Add("ნაშრომი რიგით "+i.ToString()+": შტრიხკოდი დაზიანებულია ან არ არის შესაბამისი ტიპის");
                    else
                    {
                        if (SctiptBarcodes[i].Type==BarcodeType.Script)
                        {
                            BID=bInfo.Id;
                            OrdinalNum = bInfo.OrdinalNum;
                            rowIndex = ds.tEntrantPlacement.DefaultView.Find(BID);
                            if (rowIndex!=-1  &&
                                (int)ds.tEntrantPlacement.DefaultView[rowIndex]["BarcodeNum"]==OrdinalNum &&
                            (int)ds.tEntrantPlacement.DefaultView[rowIndex]["SysBarcodeID"]==BID )

                            {
                                if (ds.tEntrantPlacement.DefaultView[rowIndex]["ActBarcodeID"]==System.DBNull.Value)
                                    ds.tEntrantPlacement.DefaultView[rowIndex]["ActBarcodeID"]=BID;
                                else
                                {
                                    Logger.Write("CheckSectorBarcodes","Script Barcode duplicate", bInfo.ToString());
                                    //throw new UI.UIException("SECTOR_SCRIPTBARCODE");
                                    messages.Add("ნაშრომი  "+SctiptBarcodes[i].VisualCode()+": ორჯერ იქნა დასკანირებული ან შტრიხკოდი დუბლირებულია");
                                }

                            }
                        else
                            {
                                Logger.Write("CheckSectorBarcodes","Script Barcode not foud", bInfo.ToString());
                                //throw new UI.UIException("SECTOR_SCRIPTBARCODE");
                                messages.Add("ნაშრომი  "+SctiptBarcodes[i].VisualCode()+": შტრიხკოდი არ უნდა ყოფილიყო გამოყენებული  ");
                            }
                        }
                        else
                        {
                            Logger.Write("CheckSectorBarcodes","Invalid Script Barcode", SctiptBarcodes[i].ToString());
                            //throw new UI.UIException("SECTOR_SCRIPTBARCODE");
                            messages.Add("ნაშრომი  "+SctiptBarcodes[i].VisualCode()+": შტრიხკოდი არ არის შესაბამისი ტიპის");
                        }
                    }
                }
                ds.tExtraActionTypes.DefaultView.Sort="ID";
                for (int i=0; i< ds.tEntrantPlacement.Rows.Count;i++)
                {
                    bool noScript=false;
                    rowIndex=-1;
                    if (ds.tEntrantPlacement.Rows[i]["ExtraActionType"]!=System.DBNull.Value)
                        rowIndex=ds.tExtraActionTypes.DefaultView.Find(ds.tEntrantPlacement.Rows[i]["ExtraActionType"]);
                    if (rowIndex!=-1)
                        noScript = ((int)ds.tExtraActionTypes.DefaultView[rowIndex]["NoScript"])==1;

                    if (noScript==false && ds.tEntrantPlacement.Rows[i]["ActBarcodeID"]==System.DBNull.Value)
                    {
                        Logger.Write("CheckSectorBarcodes","Script is missing for table ", ds.tEntrantPlacement.Rows[i]["TableNum"]);
                        //throw new UI.UIException("SECTOR_MISSINGSCRIPT");
                        messages.Add("მაგიდისათვის № "+ds.tEntrantPlacement.Rows[i]["TableNum"].ToString()+": ნაშრომი არ არის რეგისტრირებული" );

                    }
                    if (noScript==true && ds.tEntrantPlacement.Rows[i]["ActBarcodeID"]!=System.DBNull.Value)
                    {
                        Logger.Write("CheckSectorBarcodes","Script could not be presented", ds.tEntrantPlacement.Rows[i]["TableNum"]);
                        //throw new UI.UIException("SECTOR_EXTRASCRIPT");
                        messages.Add("ნაშრომი მაგიდისათვის № "+ds.tEntrantPlacement.Rows[i]["TableNum"].ToString()+" შუძლებელია  იყოს რეგისტრირებული" );
                    }
                }
            }