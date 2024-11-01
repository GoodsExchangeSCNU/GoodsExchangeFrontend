const FormatObject = {
  formattedTransactionRecord: (recordList) => {
    let formattedRecordList;
    formattedRecordList = recordList.map(entry => ({
      name: entry.item.name,
      picture: entry.item.img,
      price: entry.item.price,
      buyer: entry.buyer.username,
      seller: entry.seller.username,
      state: entry.state
    }));
    return formattedRecordList;
  }
}

export default FormatObject;