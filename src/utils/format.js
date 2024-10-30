const FormatObject = {
  formattedTransactionRecord: (recordList) => {
    const formattedRecordList = recordList.map(entry => ({
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