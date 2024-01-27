#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Usage: $0 <URL>"
  exit 1
fi

url=$1

# Use curl to send a request and print the size of the response body in bytes
size=$(curl -sI "$url" | awk '/Content-Length/ {print $2}' | tr -d '\r\n')

echo "$size"
