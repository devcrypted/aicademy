#!/bin/bash
# Development server with filtered warnings
npm run dev 2>&1 | grep -v "Deprecation Warning" | grep -v "More info:" | grep -v "legacy-js-api" | grep -v "@import rules are deprecated"