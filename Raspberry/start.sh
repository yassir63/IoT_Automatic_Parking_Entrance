#!/bin/bash

# Your root password (replace "your_password" with the actual password)
ROOT_PASSWORD="ssy"

# Echo the root password and pipe it to the 'su' command
echo "$ROOT_PASSWORD" | su -

# Activate conda environment (replace "iot" with your actual environment name)
source activate iot

# Run your Python script
python system.py
