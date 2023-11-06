document.getElementById('generate-btn').addEventListener('click', function() {
    var text = document.getElementById('text-input').value;
    if (text.trim() === '') {
        alert("Please enter the text for the QR code.");
        return;
    }

    // Clear Previous QR Code
    document.getElementById('qrcode').innerHTML = '';

    // Encrypt the text
    var encrypted = CryptoJS.AES.encrypt(text, 'secret passphrase').toString();

    // Generate the QR Code with the encrypted text
    new QRCode(document.getElementById('qrcode'), encrypted);
});
