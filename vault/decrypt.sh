#!/bin/bash

if [ -z "$VAULT_PASS" ];
	then
	echo "Could not decrypt the vault without key"
	exit 1
fi;

gpg --passphrase "$VAULT_PASS" --batch --yes vault/secret.tar.gpg
tar -zxvf vault/secret.tar
rm vault/secret.tar
