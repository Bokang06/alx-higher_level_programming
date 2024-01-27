#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Usage: $0 <URL>"
  exit 1
fi

url=$1

# Use curl to send a GET request and display the body only for a 200 status code
body=$(curl -s -o /dev/null -w "%{http_code}" "$url")

if [ "$body" -eq 200 ]; then
    curl -s "$url"
fi
