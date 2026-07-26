#!/usr/bin/env bash

# removes duplicated "- unpublished" lines, leaving one
# Ollama gpt-oss:20b

d="$1"
for f in "$d"/*; do [[ -f $f ]] || continue
    perl -i -ne 'print unless ($seen && /^\s*- unpublished$/); if (/^\s*- unpublished$/) {$seen=1}' "$f"
done
