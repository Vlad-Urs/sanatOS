package com.team16.sanatos.Security;

import java.security.KeyPair;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.nio.charset.StandardCharsets;
import java.security.KeyPairGenerator;
import javax.crypto.Cipher;
import java.sql.DriverManager;

public class Encryption {
    private static final KeyPair keyPair;

    static {
        keyPair = generateKeyPair();
    }

    private static KeyPair generateKeyPair() {
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            return keyPairGenerator.generateKeyPair();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating RSA key pair", e);
        }
    }

    public static void encryptAndInsertData(String dataToEncrypt) throws SQLException {
        try {
            // Encrypt the data with the public key
            byte[] encryptedData = encryptWithPublicKey(dataToEncrypt);

            try (Connection conn = getConnection();
                 PreparedStatement preparedStatement = conn.prepareStatement("INSERT INTO your_table (encrypted_data) VALUES (?)")) {
                preparedStatement.setBytes(1, encryptedData);
                preparedStatement.executeUpdate();
            }
        } catch (Exception e) {
            throw new SQLException("Data encryption and insertion failed", e);
        }
    }

    public static String decryptData(ResultSet resultSet, String columnName) throws SQLException {
        try {
            byte[] encryptedData = resultSet.getBytes(columnName);
            return decryptWithPrivateKey(encryptedData);
        } catch (Exception e) {
            throw new SQLException("Data decryption failed", e);
        }
    }

    private static Connection getConnection() throws SQLException {
        return DriverManager.getConnection("jdbc:mysql://localhost:3306/your_database", "username", "password");
    }
    //encryption
    private static byte[] encryptWithPublicKey(String data) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, keyPair.getPublic());
        return cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
    }
    // decryption
    private static String decryptWithPrivateKey(byte[] encryptedData) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, keyPair.getPrivate());
        byte[] decryptedData = cipher.doFinal(encryptedData);
        return new String(decryptedData, StandardCharsets.UTF_8);
    }
}
