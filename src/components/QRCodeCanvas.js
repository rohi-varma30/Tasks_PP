import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeComponent = () => {
  return (
    <div>
      <h1>Scan to Pay</h1>
      <QRCodeCanvas value="upi://pay?pa=example@upi&pn=MerchantName&am=100.00&cu=INR" />
    </div>
  );
};

export default QRCodeComponent;
