#!/bin/bash

# grabs date from within file and adds it as prefix to filename

count=0
#limit=8

DIR=.

if [ -n "$1" ]; then
  DIR=$1
fi

if [ -d "$DIR" ]; then

  echo "processing $DIR/*.md"

  for file in "$DIR"/*.md
  do
    #if [[ $count -lt $limit ]]; then

      rename=false

      while IFS= read -r line
      do
        if [[ $line == date* ]]; then
          # File has date
          date=${line:6:10}

          curdir=$(echo "$file" | cut -d "/" -f 1)
          curfile=$(echo "$file" | cut -d "/" -f 2)

          if [[ ! $curfile == $date* ]]; then
            # file doesn't start with date; grab and rename file
            # echo "found date: $date"
            echo "..processing $file"
            rename=true
          fi
        else
          # File does not have date; skip
          # echo "no date string found"
          :
        fi
      done < "$file"

      # add date to front, e.g. file1.md -> 1999-01-05-file1.md
      if [[ $rename == true ]]; then
        count=$((count + 1))

        curdir=$(echo "$file" | cut -d "/" -f 1)
        curfile=$(echo "$file" | cut -d "/" -f 2)

        mv "$file" "$curdir/$date-$curfile"
      fi

    #fi
  done

  echo "processed $count post(s)"

else
  echo "Error: $DIR does not exist"
fi
