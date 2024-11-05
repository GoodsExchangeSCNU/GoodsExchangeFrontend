const FormatObject = {
  formattedTransactionRecord: (recordList) => {
    let formattedRecordList;
    formattedRecordList = recordList.map(entry => ({
      id: entry.id,
      name: entry.item.name,
      picture: decodeURIComponent(entry.item.img[0]),
      price: entry.item.price,
      buyer: entry.buyer.username,
      seller: entry.seller.username,
      state: entry.state,
      picture_list: entry.item.img.map((img) => decodeURIComponent(img))
    }));
    return formattedRecordList;
  }
}

export default FormatObject;