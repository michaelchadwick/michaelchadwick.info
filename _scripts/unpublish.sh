#!/bin/bash

# adds "unpublished" tag to files in a directory

count=0
# limit=1

DIR=.

if [ -n "$1" ]; then
  DIR=$1
fi

if [ -d "$DIR" ]; then

  echo "processing $DIR/*.md"

  for file in "$DIR"/*.md
  do
    # if [[ $count -lt $limit ]]; then

      privatize=false

      while IFS= read -r line
      do
        if [[ $line == tags:* ]]; then
          # File has tags, so add unpublished one at top of list
          echo "..processing $file"
          privatize=true
        else
          # File does not have date; skip
          # echo "no date string found"
          :
        fi
      done < "$file"

      # add new unpublished tag
      if [[ $privatize == true ]]; then
        count=$((count + 1))

        match='tags:'
        insert='\n  - unpublished'

        sed -i "" "s/$match/$match$insert/" "$file"
      fi

    # fi
  done

  echo "processed $count post(s)"

else
  echo "Error: $DIR does not exist"
fi
