const FormatObject = {
  formattedTransactionRecord: (recordList) => {
    let formattedRecordList;
    formattedRecordList = recordList.map(entry => ({
      id: entry.id,
      name: entry.item.name,
      picture: decodeURIComponent(entry.item.img[0].image),
      // picture: decodeURIComponent(entry.item.img[0]),
      price: entry.item.price,
      buyer: entry.buyer.username,
      seller: entry.seller.username,
      state: entry.state,
      picture_list: entry.item.img.map((img) => decodeURIComponent(img.image))
      // picture_list: entry.item.img.map((img) => decodeURIComponent(img))
    }));
    return formattedRecordList;
  },

  formattedChatroomList: (chatroomList) => {
    let formattedChatroomList;
    formattedChatroomList = chatroomList.map(entry => ({
      seller: entry.seller,
      buyer: entry.buyer,
      room_id: entry.room_id,
      type: entry.type,
      item_id: entry.item_id,
      contact: entry.type === "seller" ? entry.buyer : entry.seller
    }));
    return formattedChatroomList;
  },
}

export default FormatObject;