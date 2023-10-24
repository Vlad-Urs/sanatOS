package com.team16.sanatos.Security;

import java.security.MessageDigest;
import java.security.PrivateKey;
import java.security.interfaces.RSAPrivateKey;
import javax.crypto.Cipher;
import java.nio.charset.StandardCharsets;

public class PasswordVerifier {
    public static boolean verifyPassword(String inputPassword, String storedEncryptedPassword, RSAPrivateKey privateKey) throws Exception {
        try {
            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.DECRYPT_MODE, privateKey);
            byte[] decryptedPassword = cipher.doFinal(storedEncryptedPassword.getBytes(StandardCharsets.UTF_8));

            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashedInputPassword = digest.digest(inputPassword.getBytes(StandardCharsets.UTF_8));

            return MessageDigest.isEqual(hashedInputPassword, decryptedPassword);
        } catch (Exception e) {
            throw new Exception("Password verification failed", e);
        }
    }
}

