import express from "express";
import cors from "cors";
import "dotenv/config";
import moment from "moment";
import crypto from "crypto";
import qs from "qs";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

app.get("/payment", (req, res) => {
  const { amount, orderId, orderInfo } = req.query;
  
  let ipAddr = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || req.ip || "127.0.0.1";
  if (ipAddr === "::1" || ipAddr.includes("::ffff:")) {
    ipAddr = "127.0.0.1";
  }

  const tmnCode = (process.env.VNP_TMN_CODE || "").trim();
  const secretKey = (process.env.VNP_HASH_SECRET || "").trim();
  let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  
  // Tự động bắt đúng port của Shop (5173 hoặc 5174)
  const frontendUrl = req.headers.origin || (req.headers.referer ? new URL(req.headers.referer).origin : "http://localhost:5174");
  const returnUrl = `${frontendUrl}/payment-callback`;
  
  const date = new Date();
  const createDate = moment(date).format("YYYYMMDDHHmmss");
  
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = "VND";
  vnp_Params["vnp_TxnRef"] = String(orderId || date.getTime());
  vnp_Params["vnp_OrderInfo"] = "Thanh_toan_don_hang_" + String(orderId || date.getTime());
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = parseInt(amount) * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;

  vnp_Params = sortObject(vnp_Params);

  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex"); 
  
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });

  console.log("✅ Generated URL:", vnpUrl);
  res.json({ url: vnpUrl });
});

// API kiểm tra trả về từ VNPay
app.get("/", (req, res) => {
  let vnp_Params = req.query;
  const secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  const secretKey = (process.env.VNP_HASH_SECRET || "").trim();
  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  console.log("VNPay return query:", req.query);

  if (secureHash === signed && req.query.vnp_ResponseCode === "00") {
    res.send("Thanh toán thành công!");
  } else {
    res.send("Thanh toán thất bại!");
  }
});

app.listen(PORT, () => {
  console.log(`VNPay server running on http://localhost:${PORT}`);
});
