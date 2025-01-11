#!/bin/bash

echo "Choose an option:"
echo "1. UI"
echo "2. API"
read -p "Enter your choice (1 or 2): " choice

case $choice in
  1)
    echo "Running: pnpm dev:ui"
    pnpm dev:ui
    ;;
  2)
    echo "Running: pnpm dev:api"
    pnpm dev:api
    ;;
  *)
    echo "Invalid choice. Exiting."
    exit 1
    ;;
esac
