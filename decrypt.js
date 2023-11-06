document.getElementById('decrypt-btn').addEventListener('click', function() {
    var encryptedText = document.getElementById('encrypted-input').value;
    var userId = document.getElementById('user-id').value;
    var password = document.getElementById('password').value;

    // Check if the user ID and password match
    if (userId === 'supreeth' && password === '123') {
        if (encryptedText.trim() === '') {
            alert("Please enter the encrypted text.");
            return;
        }

        // Decrypt the text
        try {
            var bytes  = CryptoJS.AES.decrypt(encryptedText, 'secret passphrase');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);

            if (!originalText) {
                throw new Error('Invalid encrypted text or passphrase.');
            }

            document.getElementById('decrypted-text').textContent = 'Decrypted Text: ' + originalText;
        } catch (e) {
            document.getElementById('decrypted-text').textContent = 'An error occurred: ' + e.message;
        }
    } else {
        alert('Invalid user ID or password.');
    }
});
