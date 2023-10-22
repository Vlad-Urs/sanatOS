package com.team16.sanatos.Security;

import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import javax.crypto.Cipher;

public class PasswordHasher {
    public static String hashAndEncryptPassword(String password, PublicKey publicKey) throws Exception {

        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hashedPassword = digest.digest(password.getBytes(StandardCharsets.UTF_8));

        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] encryptedPassword = cipher.doFinal(hashedPassword);

        return new String(encryptedPassword, StandardCharsets.UTF_8);
    }
}
