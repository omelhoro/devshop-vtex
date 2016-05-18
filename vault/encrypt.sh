#!/bin/bash

if [ -z "$VAULT_PASS" ];
	then
	echo "Could not decrypt the vault without key"
	exit 1
fi;

tar -zcvf vault/secret.tar ./vault/secret
gpg --symmetric --passphrase "$VAULT_PASS" vault/secret.tar
rm ./vault/secret.tar
rm -rf ./vault/secret
