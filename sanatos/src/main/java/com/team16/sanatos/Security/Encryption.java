package com.team16.sanatos.Security;

import java.security.KeyPair;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.crypto.Cipher;
import java.nio.charset.StandardCharsets;

public class Encryption {

    public static void encryptAndInsertData(String dataToEncrypt) throws Exception {
        KeyPair keyPair = KeyGenerator.generateKeyPair();

        // Encrypt the data with the public key
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, keyPair.getPublic());
        byte[] encryptedData = cipher.doFinal(dataToEncrypt.getBytes(StandardCharsets.UTF_8));

        // example of usage change to our database
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/your_database", "username", "password");
             PreparedStatement preparedStatement = conn.prepareStatement("INSERT INTO your_table (encrypted_data) VALUES (?)")) {
            preparedStatement.setBytes(1, encryptedData);
            preparedStatement.executeUpdate();
        }
    }

    public static String decryptData(ResultSet resultSet, String columnName) throws Exception {
        // Retrieve the encrypted data from the database
        byte[] encryptedData = resultSet.getBytes(columnName);


        KeyPair keyPair = KeyGenerator.generateKeyPair();

        // Decrypt the data with the private key
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, keyPair.getPrivate());
        byte[] decryptedData = cipher.doFinal(encryptedData);

        return new String(decryptedData, StandardCharsets.UTF_8);
    }
}
