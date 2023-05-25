#!/usr/bin/env bash

. ./unimelb-comp90024-2023-grp-48-openrc.sh; ansible-playbook -vvvv -i hosts all-in-one.yaml | tee output.txt
