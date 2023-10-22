package com.team16.sanatos.Security;

import java.security.KeyPair;
import java.security.KeyPairGenerator;

public class KeyGenerator {
    public static KeyPair generateKeyPair() throws Exception {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(2048);
        return keyPairGenerator.generateKeyPair();
    }
}


