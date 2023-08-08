#!/bin/bash

# renames posts in a directory that have the "unpublished" tag
# this is so they can be ignored by git

count=0
limit=-1

DIR=.

if [ -n "$1" ]; then
  DIR=$1
fi

if [ -d "$DIR" ]; then

  echo "processing $DIR/*.md"

  for file in "$DIR"/*.md
  do
    if [[ $count -lt $limit || $limit -eq -1 ]]; then

      privatize=false

      while IFS= read -r line
      do
        if [[ $line ==  *"- unpublished"* ]]; then
          # File has unpublished tag, flag it
          echo "..processing $file"
          privatize=true
        else
          # File does not have unpublished tag; skip
          # echo "no unpublished tag found"
          :
        fi
      done < "$file"

      # rename file if flagged
      if [[ $privatize == true ]]; then
        count=$((count + 1))

        curdir=$(dirname "$file")
        curfile=$(basename "$file" | cut -d "." -f 1)

        newfile="$curdir/$curfile-PRIVATE.md"

        # echo "saving as $newfile"

        mv "$file" "$newfile"
      fi

    fi
  done

  echo "processed $count post(s)"

else
  echo "Error: $DIR does not exist"
fi
