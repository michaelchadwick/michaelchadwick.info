#!/usr/bin/env bash

# removes duplicated "- unpublished" lines, leaving one
# $1 = pattern, $2 = directory (defaults to current dir)
# Ollama gpt-oss:20b

pat=$1
dir=${2:-.}
for f in "$dir"/*; do
    [[ -f $f ]] || continue
    perl -i -ne 'BEGIN{ $p = shift }
        print unless ($s && /^\Q$p\E$/);
        if (/^\Q$p\E$/) { $s=1 }' "$pat" "$f"
done

