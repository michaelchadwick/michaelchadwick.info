#!/bin/bash

# adds \n to end of files in a directory if it doesn't exist

for file in *.md
do
  if [ "$(tail -c 1 "$file"; echo x)" != $'\nx' ]; then
    # File does not end in newline, add one
    echo "" >> "$file"
    # echo "$file has no newline; add"
  else
    # File ends in a newline, don't add one
    # echo "$file has newline; skip"
    :
  fi
done
