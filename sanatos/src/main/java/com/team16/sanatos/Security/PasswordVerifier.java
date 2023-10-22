package com.team16.sanatos.Security;

import java.security.PrivateKey;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import javax.crypto.Cipher;

public class PasswordVerifier {
    public static boolean verifyPassword(String inputPassword, String storedEncryptedPassword, PrivateKey privateKey) throws Exception {
        // Decrypt with private key
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedPassword = cipher.doFinal(storedEncryptedPassword.getBytes(StandardCharsets.UTF_8));

        // Hash the input password
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hashedInputPassword = digest.digest(inputPassword.getBytes(StandardCharsets.UTF_8));

        // Compare the hashed input password with the decrypted stored password
        return MessageDigest.isEqual(hashedInputPassword, decryptedPassword);
    }
}
