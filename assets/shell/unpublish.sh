#!/bin/bash

# adds "published: false" to meta
# Ollama gpt-oss:20b

DIR=${1:-.}          # default to current directory
updated=0

for file in "$DIR"/*.md; do
    [[ -f $file ]] || continue        # skip if glob expands empty

    # Decide whether this file needs processing.
    if grep -q '^\s*-\s*unpublished\s*$' "$file" ||
       [[ $file == *-PRIVATE.md ]]; then

        perl -i -ne '
            BEGIN { $in_front = 0 }              # are we inside front‑matter?

            # Skip the "- unpublished" line.
            next if /^\s*-\s*unpublished\s*$/;

            # Detect opening "---".
            if (/^---\s*$/ && ! $in_front) {
                print;          # keep it
                $in_front = 1;
                next;
            }

            # Detect closing '---'.
            if (/^---\s*$/ && $in_front) {
                print "published: false\n";
                print;          # the closing line
                $in_front = 0;
                next;
            }

            print;              # any other line is printed unchanged
        ' "$file"

        updated=$((updated + 1))
    fi
done

echo "Updated $updated file(s)."
