#!/bin/bash

# adds "published: false" to meta

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

      unpublish=false

      while IFS= read -r line
      do
        if [[ $line == "- unpublished" ]]; then
          # File has unpublished tag, so add published: false
          echo "..processing $file"
          unpublish=true
        else
          # File does not have unpublished tag; skip
          :
        fi
      done < "$file"

      # add new unpublished tag
      if [[ $unpublish == true ]]; then
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
