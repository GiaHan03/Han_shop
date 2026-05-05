import express from "express";
import cors from "cors";
import "dotenv/config";
import { VNPay } from "vnpay";
import moment from "moment";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const vnpay = new VNPay({
  tmnCode: process.env.VNP_TMN_CODE,
  secureSecret: process.env.VNP_HASH_SECRET,
  vnpayHost: "https://sandbox.vnpayment.vn",
});

app.get("/payment", (req, res) => {
  const { amount, orderId, orderInfo } = req.query;
  const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const vnpUrl = vnpay.buildPaymentUrl({
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_Amount: parseInt(amount) * 100, // VNPay expects amount in cents/lowest unit
    vnp_IpAddr: ipAddr,
    vnp_TxnRef: String(orderId || Date.now()),
    vnp_OrderInfo: orderInfo || "Thanh toan don hang Gia Han Bakery",
    vnp_OrderType: "other",
    vnp_ReturnUrl: `http://localhost:5173/payment-callback`,
    vnp_Locale: "vn",
    vnp_CreateDate: moment().format("YYYYMMDDHHmmss"),
  });

  console.log("✅ Generated URL:", vnpUrl);
  res.json({ url: vnpUrl });
});

// API kiểm tra trả về từ VNPay
app.get("/", (req, res) => {
  const query = req.query;
  const verify = vnpay.verifyReturnUrl(query);

  console.log("VNPay return query:", query);

  if (verify && query.vnp_ResponseCode === "00") {
    res.send("Thanh toán thành công!");
  } else {
    res.send("Thanh toán thất bại!");
  }
});

app.listen(PORT, () => {
  console.log(`VNPay server running on http://localhost:${PORT}`);
});
